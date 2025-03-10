"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStorageIdNotValidError = exports.GetStorageNotFoundError = exports.GetStorageBadRequestError = void 0;
class GetStorageBadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.GetStorageBadRequestError = GetStorageBadRequestError;
class GetStorageIdNotValidError extends Error {
    constructor() {
        super('The provided ID is not valid.');
    }
}
exports.GetStorageIdNotValidError = GetStorageIdNotValidError;
class GetStorageNotFoundError extends Error {
    constructor() {
        super('Storage not found');
    }
}
exports.GetStorageNotFoundError = GetStorageNotFoundError;
