"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deleteStorage_1 = __importDefault(require("../../../UseCases/storage/deleteStorage/deleteStorage"));
const inMemoryStorageRepository_1 = require("src/repositories/impl/inMemoryStorageRepository");
describe('Test DeleteStorage UseCase', () => {
    let deleteStorage;
    let storageRepository;
    beforeAll(() => {
        storageRepository = new inMemoryStorageRepository_1.InMemoryStorageRepository();
        deleteStorage = new deleteStorage_1.default(storageRepository);
    });
    it('Success: Delete Storage', async () => {
        const request = {
            id: '676f7dd6a2ca1c984fae9724'
        };
        const result = await deleteStorage.execute(request);
        expect(result.isOk()).toBeTruthy();
    });
    it('Error: ID is not valid', async () => {
        const request = {
            id: '676f7dd6a2ca1c984fae972'
        };
        const result = await deleteStorage.execute(request);
        expect(result.isErr()).toBeTruthy();
    });
    it('Error: Storage not Found', async () => {
        const request = {
            id: '668719b8eee69c1a6c4fdafe'
        };
        const result = await deleteStorage.execute(request);
        expect(result.isErr()).toBeTruthy();
    });
});
