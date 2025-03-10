"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePurchaseStorageNotFoundError = exports.UpdatePurchaseProviderNotFoundError = exports.UpdatePurchaseNotFoundError = exports.UpdatePurchaseInvalidIdError = exports.UpdatePurchaseBadRequestError = void 0;
class UpdatePurchaseBadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UpdatePurchaseBadRequestError = UpdatePurchaseBadRequestError;
class UpdatePurchaseInvalidIdError extends Error {
    constructor() {
        super('Invalid id');
    }
}
exports.UpdatePurchaseInvalidIdError = UpdatePurchaseInvalidIdError;
class UpdatePurchaseNotFoundError extends Error {
    constructor() {
        super('Purchase not found');
    }
}
exports.UpdatePurchaseNotFoundError = UpdatePurchaseNotFoundError;
class UpdatePurchaseProviderNotFoundError extends Error {
    constructor() {
        super('Provider not found');
    }
}
exports.UpdatePurchaseProviderNotFoundError = UpdatePurchaseProviderNotFoundError;
class UpdatePurchaseStorageNotFoundError extends Error {
    constructor() {
        super('Storage not found');
    }
}
exports.UpdatePurchaseStorageNotFoundError = UpdatePurchaseStorageNotFoundError;
