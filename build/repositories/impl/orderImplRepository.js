"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderImplRepository = void 0;
const mongo_schema_1 = require("../../db/mongo.schema");
const types_1 = require("../../types");
const mappers_1 = require("../../mappers");
const helpers_1 = require("../../helpers");
const utils_1 = require("../../utils");
class OrderImplRepository {
    orderModel;
    orderDetailModel;
    agentModel;
    productModel;
    session;
    constructor() {
        this.orderModel = mongo_schema_1.orderModel;
        this.orderDetailModel = mongo_schema_1.orderDetailModel;
        this.agentModel = mongo_schema_1.agentModel;
        this.productModel = mongo_schema_1.productModel;
    }
    async getOrders(filters) {
        try {
            const { page, limit, ...query } = filters || {};
            const result = await (0, helpers_1.getPaginateAndFilteredData)(page, limit, mongo_schema_1.orderModel, query, [
                { path: 'orderDetail', populate: 'product' },
                'agent'
            ]);
            const orderMap = result.data.map((order) => mappers_1.OrderMap.fromDbToDomainDetail(order));
            return {
                data: orderMap,
                page: result.page,
                limit: result.limit,
                totalRecords: result.totalRecords,
                totalPages: result.totalPages
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getOrderById(orderId) {
        try {
            const order = await this.orderModel.findById(orderId).populate('agent').populate({
                path: 'orderDetail',
                populate: 'product'
            });
            if (!order) {
                return null;
            }
            return mappers_1.OrderMap.fromDbToDomainDetail(order);
        }
        catch (error) {
            throw error;
        }
    }
    async validateExistOrder(orderNumber) {
        try {
            const lastOrder = await this.orderModel.exists({
                orderNumber
            });
            return lastOrder ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
    async processOrderToWebhook(order, products) {
        const session = await this.orderModel.startSession();
        try {
            const { client, storeName, origin, advancePayment, agencyCost, discount, orderNumber } = order;
            return await session.withTransaction(async () => {
                const availableAgents = await this.agentModel.find({ status: true, role: types_1.Roles.AGENT }, {}, { session });
                let filteredActiveAgents = availableAgents.filter((agent) => (0, helpers_1.isActiveNow)({ agent }));
                if (filteredActiveAgents.length === 0) {
                    await this.agentModel.updateMany({ assigned: true }, { $set: { assigned: false } }, { session });
                    const newAvailableAgents = await this.agentModel.find({ status: true, role: types_1.Roles.AGENT }, {}, { session });
                    filteredActiveAgents = newAvailableAgents.filter((agent) => (0, helpers_1.isActiveNow)({ agent }));
                }
                const agentToAssigned = (0, helpers_1.getRandomValueFromArray)(filteredActiveAgents);
                const newOrder = new this.orderModel({
                    orderNumber,
                    client: client,
                    storeName: storeName,
                    agent: agentToAssigned?._id,
                    origin: origin || types_1.OriginData.ONLINE,
                    registerStatus: types_1.DataStatus.VALID
                });
                const orderSaved = await newOrder.save({ session });
                await this.agentModel.findByIdAndUpdate(agentToAssigned?._id, { assigned: true }, { session });
                let orderDetailIds = [];
                const orderDetailPromise = products.map(async (product) => {
                    const newOrderDetail = new this.orderDetailModel({
                        order: orderSaved?._id,
                        product: product.productId,
                        customProduct: product.customProduct
                            ? {
                                name: product.customProduct?.name,
                                price: product.customProduct?.price,
                                externalProductId: product.customProduct?.externalProductId,
                                sku: product.customProduct?.sku
                            }
                            : null,
                        quantity: product.quantity,
                        review: product.review,
                        origin: origin || types_1.OriginData.ONLINE
                    });
                    const result = await newOrderDetail.save({ session });
                    orderDetailIds.push(result._id);
                });
                await Promise.all(orderDetailPromise);
                const subtotal = products.reduce((acc, product) => acc + Number(product.price) * Number(product.quantity), 0);
                const pendingPayment = subtotal - advancePayment;
                const total = subtotal + agencyCost - discount;
                await this.orderModel.findByIdAndUpdate(orderSaved._id, {
                    subtotal,
                    pendingPayment,
                    total,
                    orderDetail: orderDetailIds
                }, { session, new: false });
                const order = await this.orderModel.findById(orderSaved._id, {}, { session }).populate('agent');
                const result = mappers_1.OrderMap.fromDbToDomain(order);
                return result;
            });
        }
        catch (error) {
            console.error('Error processing order => ', error);
            await session.abortTransaction();
            throw error.message;
        }
        finally {
            await session.endSession();
        }
    }
    async createOrder(request) {
        this.session = await this.orderModel.startSession();
        try {
            return await this.session.withTransaction(async () => {
                const { products, ...order } = request;
                const manualOrdersCount = await this.orderModel.countDocuments({ origin: types_1.OriginData.MANUAL });
                const newOrder = new this.orderModel({
                    orderNumber: (0, utils_1.generateOrderNumber)(manualOrdersCount + 1),
                    agency: order.agency,
                    agent: order.agent,
                    client: order.client,
                    storeName: order.storeName,
                    agencyCost: order.agencyCost,
                    advancePayment: order.advancePayment,
                    pendingPayment: order.pendingPayment,
                    subTotal: order.subTotal || 0,
                    discount: order.discount,
                    total: order.total,
                    orderDetail: [],
                    deliveryType: order.deliveryType,
                    paymentMethod: order.paymentMethod,
                    observation: order.observation,
                    contactedStatus: order.contactedStatus || '',
                    comment: order.comment || '',
                    registerStatus: types_1.DataStatus.PENDING,
                    origin: order.origin || types_1.OriginData.MANUAL
                });
                const orderSaved = await newOrder.save({ session: this.session });
                let orderDetailIds = [];
                const orderDetailPromise = products.map(async (product) => {
                    let newOrderDetail;
                    const existProduct = await this.productModel.findOne({ _id: product?.productId });
                    if (existProduct) {
                        newOrderDetail = new this.orderDetailModel({
                            order: newOrder._id,
                            product: existProduct._id,
                            quantity: product.quantity,
                            origin: order.origin || types_1.OriginData.MANUAL,
                            review: product.review,
                            registerStatus: types_1.DataStatus.VALID,
                            status: types_1.DataStatus.ACTIVE,
                            comment: product.comment || 'Producto existente en la base de datos y agregado a la orden',
                            customProduct: null
                        });
                    }
                    else if (!existProduct) {
                        newOrderDetail = new this.orderDetailModel({
                            order: newOrder._id,
                            customProduct: {
                                name: product.name,
                                price: product.price,
                                sku: product.sku,
                                externalProductId: product.externalProductId,
                                status: types_1.DataStatus.ACTIVE,
                                registerStatus: types_1.DataStatus.VALID
                            },
                            comment: product.comment || 'Producto creado manualmente, no existe en la base de datos',
                            quantity: product.quantity,
                            origin: order.origin || types_1.OriginData.MANUAL,
                            review: product.review || ''
                        });
                    }
                    const result = await newOrderDetail.save({ session: this.session });
                    orderDetailIds.push(result._id);
                });
                await Promise.all(orderDetailPromise);
                const subtotal = products.reduce((acc, product) => acc + Number(product.price) * Number(product.quantity), 0);
                const pendingPayment = subtotal - order.advancePayment;
                const total = subtotal + order.agencyCost - order.discount;
                await this.orderModel.findByIdAndUpdate(orderSaved._id, {
                    subtotal,
                    pendingPayment,
                    total,
                    orderDetail: orderDetailIds,
                    registerStatus: types_1.DataStatus.VALID
                }, { session: this.session, new: false });
                const _order = await this.orderModel
                    .findById(orderSaved._id, {}, { session: this.session })
                    .populate('agent')
                    .populate({
                    path: 'orderDetail',
                    populate: 'product'
                });
                return mappers_1.OrderMap.fromDbToDomainDetail(_order);
            });
        }
        catch (error) {
            console.error('Error creating order => ', error);
            await this.session.abortTransaction();
            throw error;
        }
        finally {
            this.session.endSession();
        }
    }
    async updateOrder(orderId, request) {
        this.session = await this.orderModel.startSession();
        try {
            return await this.session.withTransaction(async () => {
                const {} = request;
                return '';
            });
        }
        catch (error) {
            console.error('Error updating order => ', error);
            await this.session.abortTransaction();
            throw error.message;
        }
        finally {
            this.session.endSession();
        }
    }
}
exports.OrderImplRepository = OrderImplRepository;
