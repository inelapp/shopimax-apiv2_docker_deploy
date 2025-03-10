"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const createOrderErrors_1 = require("./createOrderErrors");
const domain_1 = require("../../../domain");
const types_1 = require("../../../types");
class CreateOrder {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute(request, service) {
        try {
            const { order, client, orderDetail } = request;
            const orderRequest = {
                ...order,
                origin: types_1.OriginData.MANUAL,
                client,
                orderDetail
            };
            const orderOrError = domain_1.Order.create(orderRequest);
            if (orderOrError.isErr()) {
                return (0, neverthrow_1.err)(new createOrderErrors_1.CreateOrderBadRequestError(orderOrError.error.toString()));
            }
            const result = await this.orderRepository.createOrder({
                ...orderOrError.value,
                products: orderDetail
            });
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = CreateOrder;
