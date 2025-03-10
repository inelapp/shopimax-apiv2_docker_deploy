"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
const neverthrow_1 = require("neverthrow");
const storage_validation_1 = require("./storage.validation");
class Storage {
    id;
    name;
    address;
    phone;
    email;
    capacity;
    status;
    constructor(props) {
        Object.assign(this, props);
    }
    static create(props) {
        const { error } = (0, storage_validation_1.validateStorage)(props);
        if (error) {
            const storageError = error.details.map((error) => error.message).join('. ');
            return (0, neverthrow_1.err)(storageError);
        }
        return (0, neverthrow_1.ok)(new Storage(props));
    }
    static update(props) {
        const { error } = (0, storage_validation_1.validateUpdateStorageSchema)(props);
        if (error) {
            const storageError = error.details.map((error) => error.message).join('. ');
            return (0, neverthrow_1.err)(storageError);
        }
        return (0, neverthrow_1.ok)(new Storage(props));
    }
}
exports.Storage = Storage;
