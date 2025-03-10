"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductNotFoundError = exports.GetProductBadRequestError = void 0;
class GetProductBadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.GetProductBadRequestError = GetProductBadRequestError;
class GetProductNotFoundError extends Error {
    constructor() {
        super('Product not found');
    }
}
exports.GetProductNotFoundError = GetProductNotFoundError;
