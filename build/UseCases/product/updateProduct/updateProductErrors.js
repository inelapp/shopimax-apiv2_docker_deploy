"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductRegisterStatusUpdateNotAllowedError = exports.updateProductBadRequestError = exports.UpdateProductNotFoundError = exports.UpdateProductInvalidIdError = void 0;
class updateProductBadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.updateProductBadRequestError = updateProductBadRequestError;
class UpdateProductInvalidIdError extends Error {
    constructor() {
        super('Invalid id');
    }
}
exports.UpdateProductInvalidIdError = UpdateProductInvalidIdError;
class UpdateProductNotFoundError extends Error {
    constructor() {
        super('Product not found');
    }
}
exports.UpdateProductNotFoundError = UpdateProductNotFoundError;
class updateProductRegisterStatusUpdateNotAllowedError extends Error {
    constructor() {
        super('RegisterStatus cannot be updated because it is already valid');
    }
}
exports.updateProductRegisterStatusUpdateNotAllowedError = updateProductRegisterStatusUpdateNotAllowedError;
