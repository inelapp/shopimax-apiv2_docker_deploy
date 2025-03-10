"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const processOrder_1 = require("../UseCases/order/processOrder");
const processOrderErrors_1 = require("../UseCases/order/processOrder/processOrderErrors");
const utils_1 = require("../utils");
const types_1 = require("../types");
const getOrder_1 = require("../UseCases/order/getOrder");
const getOrderErrors_1 = require("../UseCases/order/getOrder/getOrderErrors");
const createOrder_1 = require("../UseCases/order/createOrder");
const createOrderErrors_1 = require("../UseCases/order/createOrder/createOrderErrors");
const getOrders_1 = require("../UseCases/order/getOrders");
const getOrdersErrors_1 = require("../UseCases/order/getOrders/getOrdersErrors");
class OrderController {
    constructor() {
        this.processOrderWebhook = this.processOrderWebhook.bind(this);
        this.getOrder = this.getOrder.bind(this);
        this.getOrders = this.getOrders.bind(this);
        this.createOrder = this.createOrder.bind(this);
    }
    async getOrders(req, res) {
        const { page, limit, ...orderFilters } = req.query;
        const result = await getOrders_1.getOrders.execute({
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            orderFilters: {
                ...orderFilters
            }
        });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case getOrdersErrors_1.GetOrdersBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
    async getOrder(req, res) {
        const { id } = req.params;
        const result = await getOrder_1.getOrder.execute({ id });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case getOrderErrors_1.GetOrderNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                case getOrderErrors_1.GetOrderBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
    async processOrderWebhook(req, res) {
        const payload = req.body;
        const result = await processOrder_1.processOrder.execute(payload);
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case processOrderErrors_1.ProcessOrderBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.CREATED);
    }
    async createOrder(req, res) {
        const payload = req.body;
        const result = await createOrder_1.createOrder.execute(payload);
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case createOrderErrors_1.CreateOrderBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.CREATED);
    }
    async updateOrder(req, res) {
        return (0, utils_1.response)(res, 'Not implemented', types_1.StatusCode.NOT_IMPLEMENTED);
    }
}
exports.OrderController = OrderController;
