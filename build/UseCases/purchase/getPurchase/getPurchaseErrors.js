"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPurchaseNotFoundError = exports.GetPurchaseInvalidIdError = void 0;
class GetPurchaseInvalidIdError extends Error {
    constructor() {
        super('Invalid id');
    }
}
exports.GetPurchaseInvalidIdError = GetPurchaseInvalidIdError;
class GetPurchaseNotFoundError extends Error {
    constructor() {
        super('Purchase not found');
    }
}
exports.GetPurchaseNotFoundError = GetPurchaseNotFoundError;
