"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePurchaseStorageNotfoundError = exports.CreatePurchaseProviderNotfoundError = exports.CreatePurchaseBadRequestError = void 0;
class CreatePurchaseBadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.CreatePurchaseBadRequestError = CreatePurchaseBadRequestError;
class CreatePurchaseProviderNotfoundError extends Error {
    constructor() {
        super('Provider not found');
    }
}
exports.CreatePurchaseProviderNotfoundError = CreatePurchaseProviderNotfoundError;
class CreatePurchaseStorageNotfoundError extends Error {
    constructor() {
        super('Storage not found');
    }
}
exports.CreatePurchaseStorageNotfoundError = CreatePurchaseStorageNotfoundError;
