"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageMap = void 0;
class StorageMap {
    static toDbFromDomain(storage) {
        return {
            id: storage._id,
            name: storage.name,
            address: storage.address,
            phone: storage.phone,
            email: storage.email,
            capacity: storage.capacity,
            status: storage.status
        };
    }
}
exports.StorageMap = StorageMap;
