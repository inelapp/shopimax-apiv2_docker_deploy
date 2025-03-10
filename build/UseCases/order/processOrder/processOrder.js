"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const processOrderErrors_1 = require("./processOrderErrors");
const domain_1 = require("../../../domain");
const createProduct_1 = require("../../../UseCases/product/createProduct");
const types_1 = require("../../../types");
class ProcessOrder {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async processProducts(products) {
        const productsPayload = [];
        for (const product of products) {
            const payloadToSaveProduct = {
                name: product.name,
                price: Number(product.price),
                origin: types_1.OriginData.ONLINE,
                sku: product.sku,
                externalProductId: product.product_id.toString()
            };
            const productResult = await createProduct_1.createProduct.execute(payloadToSaveProduct);
            if (productResult.isErr()) {
                return (0, neverthrow_1.err)(new processOrderErrors_1.ProcessOrderBadRequestError(productResult.error.message));
            }
            productsPayload.push({
                productId: productResult.value.id,
                quantity: Number(product.quantity),
                price: Number(product.price)
            });
        }
        return (0, neverthrow_1.ok)(productsPayload);
    }
    async execute(request, service) {
        try {
            const validateRequest = (0, utils_1.createInstanceOrError)(domain_1.processOrderSchema, request);
            if (validateRequest.isErr()) {
                return (0, neverthrow_1.err)(new processOrderErrors_1.ProcessOrderBadRequestError(validateRequest.error));
            }
            const { products, client, store, order: sendingOrder } = validateRequest.value;
            const existsOrder = await this.orderRepository.validateExistOrder(sendingOrder.name);
            if (existsOrder) {
                return (0, neverthrow_1.err)(new processOrderErrors_1.ProcessOrderBadRequestError('Order already exists.'));
            }
            let productsPayload = [];
            const processProductsResult = await this.processProducts(products);
            if (processProductsResult.isErr()) {
                return (0, neverthrow_1.err)(processProductsResult.error);
            }
            productsPayload = processProductsResult.value;
            const orderProcessRequest = {
                orderNumber: sendingOrder.name,
                client: {
                    name: client.first_name,
                    lastname: client.last_name,
                    phone: client.phone,
                    country: client.country,
                    department: client.city,
                    address: client.address
                },
                advancePayment: 0,
                agencyCost: 0,
                discount: 0,
                origin: types_1.OriginData.ONLINE,
                storeName: store.name
            };
            const order = await this.orderRepository.processOrderToWebhook(orderProcessRequest, productsPayload);
            return (0, neverthrow_1.ok)(order);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = ProcessOrder;
