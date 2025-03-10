"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProviderNotFoundError = exports.GetProviderInvalidIdError = void 0;
class GetProviderInvalidIdError extends Error {
    constructor() {
        super('Invalid id');
    }
}
exports.GetProviderInvalidIdError = GetProviderInvalidIdError;
class GetProviderNotFoundError extends Error {
    constructor() {
        super('Provider not found');
    }
}
exports.GetProviderNotFoundError = GetProviderNotFoundError;
