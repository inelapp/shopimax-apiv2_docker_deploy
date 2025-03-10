"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inMemoryStorageRepository_1 = require("src/repositories/impl/inMemoryStorageRepository");
const getStorages_1 = __importDefault(require("src/UseCases/storage/getStorages/getStorages"));
describe('Test GetStorage UseCase', () => {
    let getStorages;
    let storageRepository;
    beforeAll(() => {
        storageRepository = new inMemoryStorageRepository_1.InMemoryStorageRepository();
        getStorages = new getStorages_1.default(storageRepository);
    });
    it('Success: Get Storages', async () => {
        const request = {
        // id: "676f7dd6a2ca1c984fae9724"
        };
        const result = await getStorages.execute(request);
        expect(result.isOk()).toBeTruthy();
    });
});
