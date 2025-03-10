"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteStorageNotFoundError = exports.DeleteStorageBadRequestError = void 0;
class DeleteStorageBadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.DeleteStorageBadRequestError = DeleteStorageBadRequestError;
class DeleteStorageNotFoundError extends Error {
    constructor() {
        super('Storage not found');
    }
}
exports.DeleteStorageNotFoundError = DeleteStorageNotFoundError;
