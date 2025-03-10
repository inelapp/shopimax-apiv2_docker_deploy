"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePurchaseNotFoundError = exports.DeletePurchaseInvalidIdError = void 0;
class DeletePurchaseInvalidIdError extends Error {
    constructor() {
        super('Invalid id');
    }
}
exports.DeletePurchaseInvalidIdError = DeletePurchaseInvalidIdError;
class DeletePurchaseNotFoundError extends Error {
    constructor() {
        super('Purchase not found');
    }
}
exports.DeletePurchaseNotFoundError = DeletePurchaseNotFoundError;
