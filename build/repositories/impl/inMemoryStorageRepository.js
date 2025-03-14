"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryStorageRepository = void 0;
class InMemoryStorageRepository {
    getStorages(filters) {
        if (filters?.id === '676f7dd6a2ca1c984fae9724' || filters?.id === '676f7dd6a2ca1c984fae9725') {
            return Promise.resolve({
                data: [
                    {
                        id: '676f7dd6a2ca1c984fae9724',
                        name: 'test2',
                        address: 'Avenida Mexico 444, La Victoria, Lima',
                        phone: '987654321',
                        email: 'test2@email.com',
                        capacity: '500m2',
                        status: 'inactive'
                    },
                    {
                        id: '676f7dd6a2ca1c984fae9725',
                        name: 'test2',
                        address: 'Avenida Mexico 444, La Victoria, Lima',
                        phone: '987654321',
                        email: 'test2@email.com',
                        capacity: '500m2',
                        status: 'inactive'
                    }
                ],
                page: 1,
                limit: 10,
                totalRecords: 2,
                totalPages: 1
            });
        }
        else {
            return Promise.resolve({
                data: [],
                page: 1,
                limit: 10,
                totalRecords: 0,
                totalPages: 0
            });
        }
    }
    getStorage(filters) {
        if (filters?.id === '676f7dd6a2ca1c984fae9724') {
            return Promise.resolve({
                id: '676f7dd6a2ca1c984fae9724',
                name: 'test2',
                address: 'Avenida Mexico 444, La Victoria, Lima',
                phone: '987654321',
                email: 'test2@email.com',
                capacity: '500m2',
                status: 'inactive'
            });
        }
        else {
            return Promise.resolve(null);
        }
    }
    createStorage(request) {
        return Promise.resolve({
            id: '676f7dd6a2ca1c984fae9726',
            ...request
        });
    }
    updateStorage(id, storage) {
        if (id === '676f7dd6a2ca1c984fae9724') {
            return Promise.resolve({
                id: '676f7dd6a2ca1c984fae9724',
                name: 'test2',
                address: 'Avenida Mexico 444, La Victoria, Lima',
                phone: '987654321',
                email: 'test2@email.com',
                capacity: '500m2',
                status: 'active',
                ...storage
            });
        }
        else {
            return Promise.resolve(null);
        }
    }
    deleteStorage(id) {
        if (id === '676f7dd6a2ca1c984fae9724') {
            return Promise.resolve(true);
        }
        else {
            return Promise.resolve(true);
        }
    }
}
exports.InMemoryStorageRepository = InMemoryStorageRepository;
