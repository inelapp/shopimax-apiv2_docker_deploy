"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderNotFoundError = exports.GetOrderBadRequestError = void 0;
class GetOrderBadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.GetOrderBadRequestError = GetOrderBadRequestError;
class GetOrderNotFoundError extends Error {
    constructor() {
        super('Order not found');
    }
}
exports.GetOrderNotFoundError = GetOrderNotFoundError;
