"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStorageAlreadyAssigned = exports.UpdateStorageIdNotValidError = exports.UpdateStorageBadRequestError = exports.UpdateStorageNotFoundError = void 0;
class UpdateStorageNotFoundError extends Error {
    constructor() {
        super('Storage not found.');
    }
}
exports.UpdateStorageNotFoundError = UpdateStorageNotFoundError;
class UpdateStorageIdNotValidError extends Error {
    constructor() {
        super('The provided ID is not valid.');
    }
}
exports.UpdateStorageIdNotValidError = UpdateStorageIdNotValidError;
class UpdateStorageAlreadyAssigned extends Error {
    constructor(message = 'Some values ​​have already been assigned to another Storage.') {
        super(message);
    }
}
exports.UpdateStorageAlreadyAssigned = UpdateStorageAlreadyAssigned;
class UpdateStorageBadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UpdateStorageBadRequestError = UpdateStorageBadRequestError;
