"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageCreateAlreadyAssigned = exports.StorageAlreadyRegisteredError = exports.CreateStorageBadRequestError = void 0;
class CreateStorageBadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.CreateStorageBadRequestError = CreateStorageBadRequestError;
class StorageAlreadyRegisteredError extends Error {
    constructor(message = 'Storage already registered') {
        super(message);
    }
}
exports.StorageAlreadyRegisteredError = StorageAlreadyRegisteredError;
class StorageCreateAlreadyAssigned extends Error {
    constructor(message = 'Some values ​​have already been assigned to another Storage.') {
        super(message);
    }
}
exports.StorageCreateAlreadyAssigned = StorageCreateAlreadyAssigned;
