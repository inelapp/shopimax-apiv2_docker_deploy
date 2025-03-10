"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProviderNotFoundError = exports.DeleteProviderInvalidIdError = void 0;
class DeleteProviderInvalidIdError extends Error {
    constructor() {
        super('Invalid id');
    }
}
exports.DeleteProviderInvalidIdError = DeleteProviderInvalidIdError;
class DeleteProviderNotFoundError extends Error {
    constructor() {
        super('Provider not found');
    }
}
exports.DeleteProviderNotFoundError = DeleteProviderNotFoundError;
