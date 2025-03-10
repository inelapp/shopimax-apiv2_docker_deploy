"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inMemoryStorageRepository_1 = require("src/repositories/impl/inMemoryStorageRepository");
const createStorage_1 = __importDefault(require("src/UseCases/storage/createStorage/createStorage"));
describe('Test CreateStorage UseCase', () => {
    let createStorage;
    let storageRepository;
    beforeAll(() => {
        storageRepository = new inMemoryStorageRepository_1.InMemoryStorageRepository();
        createStorage = new createStorage_1.default(storageRepository);
    });
    it('Success: Create Storage', async () => {
        const request = {
            name: 'test2',
            address: 'Avenida Mexico 444, La Victoria, Lima',
            phone: '987654321',
            email: 'test2@email.com',
            capacity: '500m2',
            status: 'inactive'
        };
        const result = await createStorage.execute(request);
        expect(result.isOk()).toBeTruthy();
    });
    it('Error: Params is not valid', async () => {
        const request = {
            name: 'test2',
            address: 'Avenida Mexico 444, La Victoria, Lima',
            phone: '987654321',
            email: 'test2@email.com',
            capacity: '500m2',
            status: 'true' // param not valid
        };
        const result = await createStorage.execute(request);
        expect(result.isErr()).toBeTruthy();
    });
    it('Error: request body empty', async () => {
        const request = {
            name: '',
            address: '',
            phone: '',
            email: '',
            capacity: '',
            status: ''
        };
        const result = await createStorage.execute(request);
        expect(result.isErr()).toBeTruthy();
    });
});
