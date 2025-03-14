import {
  GetOrderFilters,
  IOrderCreateOrUpdateRequest,
  IOrderRepository,
  OrderProcessRequest,
  ProductRequest
} from '../order.repository';
import { agentModel, orderDetailModel, orderModel, productModel } from '../../db/mongo.schema';
import { DataStatus, GenericFilters, OriginData, Roles } from '../../types';
import { OrderDbResponse, OrderDbResponseDetailMap, OrderMap } from '../../mappers';
import { MongooseError, ClientSession } from 'mongoose';
import { IOrderProps, Order } from '../../domain';
import { getPaginateAndFilteredData, getRandomValueFromArray, IPaginateData, isActiveNow } from '../../helpers';
import { generateOrderNumber, ramdonString } from '../../utils';

export class OrderImplRepository implements IOrderRepository {
  private readonly orderModel: typeof orderModel;

  private readonly orderDetailModel: typeof orderDetailModel;

  private readonly agentModel: typeof agentModel;

  private readonly productModel: typeof productModel;

  private session: ClientSession;

  constructor() {
    this.orderModel = orderModel;
    this.orderDetailModel = orderDetailModel;
    this.agentModel = agentModel;
    this.productModel = productModel;
  }

  async getOrders(filters?: GetOrderFilters & GenericFilters): Promise<IPaginateData<OrderDbResponseDetailMap>> {
    try {
      const { page, limit, ...query } = filters || {};
      const result = await getPaginateAndFilteredData<Order, GetOrderFilters>(page, limit, orderModel, query, [
        { path: 'orderDetail', populate: 'product' },
        'agent'
      ]);
      const orderMap = result.data.map((order) => OrderMap.fromDbToDomainDetail(order as unknown as OrderDbResponse));
      return {
        data: orderMap,
        page: result.page,
        limit: result.limit,
        totalRecords: result.totalRecords,
        totalPages: result.totalPages
      };
    } catch (error) {
      throw error;
    }
  }

  async getOrderById(orderId: string): Promise<OrderDbResponseDetailMap | null> {
    try {
      const order = await this.orderModel.findById(orderId).populate('agent').populate({
        path: 'orderDetail',
        populate: 'product'
      });
      if (!order) {
        return null;
      }
      return OrderMap.fromDbToDomainDetail(order as unknown as OrderDbResponse);
    } catch (error) {
      throw error;
    }
  }

  async validateExistOrder(orderNumber: string): Promise<boolean> {
    try {
      const lastOrder = await this.orderModel.exists({
        orderNumber
      });
      return lastOrder ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async processOrderToWebhook(order: OrderProcessRequest, products: Partial<ProductRequest>[]): Promise<Order> {
    const session = await this.orderModel.startSession();
    try {
      const { client, storeName, origin, advancePayment, agencyCost, discount, orderNumber } = order;
      return await session.withTransaction(async () => {
        const availableAgents = await this.agentModel.find({ status: true, role: Roles.AGENT }, {}, { session });
        let filteredActiveAgents = availableAgents.filter((agent) => isActiveNow({ agent }));

        if (filteredActiveAgents.length === 0) {
          await this.agentModel.updateMany({ assigned: true }, { $set: { assigned: false } }, { session });
          const newAvailableAgents = await this.agentModel.find({ status: true, role: Roles.AGENT }, {}, { session });
          filteredActiveAgents = newAvailableAgents.filter((agent) => isActiveNow({ agent }));
        }

        const agentToAssigned = getRandomValueFromArray(filteredActiveAgents);

        const newOrder = new this.orderModel({
          orderNumber,
          client: client,
          storeName: storeName,
          agent: agentToAssigned?._id,
          origin: origin || OriginData.ONLINE,
          registerStatus: DataStatus.VALID
        });
        const orderSaved = await newOrder.save({ session });
        await this.agentModel.findByIdAndUpdate(agentToAssigned?._id, { assigned: true }, { session });
        let orderDetailIds: string[] = [];

        const orderDetailPromise = products.map(async (product) => {
          const newOrderDetail = new this.orderDetailModel({
            order: orderSaved?._id,
            product: product.productId,
            customProduct: product.customProduct
              ? {
                  name: product!.customProduct?.name,
                  price: product!.customProduct?.price,
                  externalProductId: product!.customProduct?.externalProductId,
                  sku: product!.customProduct?.sku
                }
              : null,
            quantity: product.quantity,
            review: product.review,
            origin: origin || OriginData.ONLINE
          });
          const result = await newOrderDetail.save({ session });
          orderDetailIds.push(result._id);
        });

        await Promise.all(orderDetailPromise);
        const subtotal = products.reduce((acc, product) => acc + Number(product.price) * Number(product.quantity), 0);
        const pendingPayment = subtotal - advancePayment;
        const total = subtotal + agencyCost - discount;
        await this.orderModel.findByIdAndUpdate(
          orderSaved._id,
          {
            subtotal,
            pendingPayment,
            total,
            orderDetail: orderDetailIds
          },
          { session, new: false }
        );
        const order = await this.orderModel.findById(orderSaved._id, {}, { session }).populate('agent');
        const result = OrderMap.fromDbToDomain(order as unknown as OrderDbResponse);
        return result;
      });
    } catch (error: MongooseError | any) {
      console.error('Error processing order => ', error);
      await session.abortTransaction();
      throw error.message;
    } finally {
      await session.endSession();
    }
  }

  async createOrder(request: IOrderCreateOrUpdateRequest): Promise<OrderDbResponseDetailMap> {
    this.session = await this.orderModel.startSession();
    try {
      return await this.session.withTransaction(async () => {
        const { products, ...order } = request;
        const manualOrdersCount = await this.orderModel.countDocuments({ origin: OriginData.MANUAL });
        const newOrder = new this.orderModel({
          orderNumber: generateOrderNumber(manualOrdersCount + 1),
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
          registerStatus: DataStatus.PENDING,
          origin: order.origin || OriginData.MANUAL
        });
        const orderSaved = await newOrder.save({ session: this.session });
        let orderDetailIds: string[] = [];
        const orderDetailPromise = products.map(async (product) => {
          let newOrderDetail;
          const existProduct = await this.productModel.findOne({ _id: product?.productId });
          if (existProduct) {
            newOrderDetail = new this.orderDetailModel({
              order: newOrder._id,
              product: existProduct._id,
              quantity: product.quantity,
              origin: order.origin || OriginData.MANUAL,
              review: product.review,
              registerStatus: DataStatus.VALID,
              status: DataStatus.ACTIVE,
              comment: product.comment || 'Producto existente en la base de datos y agregado a la orden',
              customProduct: null
            });
          } else if (!existProduct) {
            newOrderDetail = new this.orderDetailModel({
              order: newOrder._id,
              customProduct: {
                name: product.name,
                price: product.price,
                sku: product.sku,
                externalProductId: product.externalProductId,
                status: DataStatus.ACTIVE,
                registerStatus: DataStatus.VALID
              },
              comment: product.comment || 'Producto creado manualmente, no existe en la base de datos',
              quantity: product.quantity,
              origin: order.origin || OriginData.MANUAL,
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
        await this.orderModel.findByIdAndUpdate(
          orderSaved._id,
          {
            subtotal,
            pendingPayment,
            total,
            orderDetail: orderDetailIds,
            registerStatus: DataStatus.VALID
          },
          { session: this.session, new: false }
        );
        const _order = await this.orderModel
          .findById(orderSaved._id, {}, { session: this.session })
          .populate('agent')
          .populate({
            path: 'orderDetail',
            populate: 'product'
          });
        return OrderMap.fromDbToDomainDetail(_order as unknown as OrderDbResponse);
      });
    } catch (error) {
      console.error('Error creating order => ', error);
      await this.session.abortTransaction();
      throw error;
    } finally {
      this.session.endSession();
    }
  }

  async updateOrder(orderId: string, request: Partial<IOrderProps>): Promise<Order> {
    this.session = await this.orderModel.startSession();
    try {
      return await this.session.withTransaction(async () => {
        const {} = request;
        return '' as any;
      });
    } catch (error) {
      console.error('Error updating order => ', error);
      await this.session.abortTransaction();
      throw error.message;
    } finally {
      this.session.endSession();
    }
  }
}
