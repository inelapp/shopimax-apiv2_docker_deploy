"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProviderNotFoundError = exports.UpdateProviderInvalidIdError = exports.UpdateProviderBadRequestError = void 0;
class UpdateProviderBadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UpdateProviderBadRequestError = UpdateProviderBadRequestError;
class UpdateProviderInvalidIdError extends Error {
    constructor() {
        super('Invalid id');
    }
}
exports.UpdateProviderInvalidIdError = UpdateProviderInvalidIdError;
class UpdateProviderNotFoundError extends Error {
    constructor() {
        super('Provider not found');
    }
}
exports.UpdateProviderNotFoundError = UpdateProviderNotFoundError;
