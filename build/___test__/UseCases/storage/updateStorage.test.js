"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inMemoryStorageRepository_1 = require("src/repositories/impl/inMemoryStorageRepository");
const updateStorage_1 = __importDefault(require("src/UseCases/storage/updateStorage/updateStorage"));
describe('Test CreateStorage UseCase', () => {
    let updateStorage;
    let storageRepository;
    beforeAll(() => {
        storageRepository = new inMemoryStorageRepository_1.InMemoryStorageRepository();
        updateStorage = new updateStorage_1.default(storageRepository);
    });
    it('Success: Update Storage', async () => {
        const request = {
            id: '676f7dd6a2ca1c984fae9724',
            status: 'inactive'
        };
        const result = await updateStorage.execute(request);
        expect(result.isOk()).toBeTruthy();
    });
    it('Error: ID is not Valid', async () => {
        const request = {
            id: '676f7dd6a2ca1c984fae972',
            status: 'inactive'
        };
        const result = await updateStorage.execute(request);
        expect(result.isErr()).toBeTruthy();
    });
    it('Error: Storage not found', async () => {
        const request = {
            id: '676f7dd6a2ca1c984fae9727',
            status: 'inactive'
        };
        const result = await updateStorage.execute(request);
        expect(result.isErr()).toBeTruthy();
    });
    it('Error: Params is not valid', async () => {
        const request = {
            id: '676f7dd6a2ca1c984fae9727',
            name: 'null' // active or inactive
        };
        const result = await updateStorage.execute(request);
        expect(result.isErr()).toBeTruthy();
    });
    it('Error: request body empty', async () => {
        const request = {
            id: '676f7dd6a2ca1c984fae9727',
            name: ''
        };
        const result = await updateStorage.execute(request);
        expect(result.isErr()).toBeTruthy();
    });
});
