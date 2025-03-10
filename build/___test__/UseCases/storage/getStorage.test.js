"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inMemoryStorageRepository_1 = require("src/repositories/impl/inMemoryStorageRepository");
const getStorage_1 = __importDefault(require("src/UseCases/storage/getStorage/getStorage"));
describe('Test GetStorage UseCase', () => {
    let getStorage;
    let storageRepository;
    beforeAll(() => {
        storageRepository = new inMemoryStorageRepository_1.InMemoryStorageRepository();
        getStorage = new getStorage_1.default(storageRepository);
    });
    it('Success: Get Storage', async () => {
        const request = {
            id: '676f7dd6a2ca1c984fae9724'
        };
        const result = await getStorage.execute(request);
        expect(result.isOk()).toBeTruthy();
    });
    it('Error: ID is not valid', async () => {
        const request = {
            id: '676f7dd6a2ca1c984fae972'
        };
        const result = await getStorage.execute(request);
        expect(result.isErr()).toBeTruthy();
    });
    it('Error: Storage not Found', async () => {
        const request = {
            id: '668719b8eee69c1a6c4fdafe'
        };
        const result = await getStorage.execute(request);
        expect(result.isErr()).toBeTruthy();
    });
});
