"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const getOrderErrors_1 = require("./getOrderErrors");
class GetOrder {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute(request, service) {
        try {
            const { id } = request;
            const order = await this.orderRepository.getOrderById(id);
            if (!order) {
                return (0, neverthrow_1.err)(new getOrderErrors_1.GetOrderNotFoundError());
            }
            return (0, neverthrow_1.ok)(order);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = GetOrder;
