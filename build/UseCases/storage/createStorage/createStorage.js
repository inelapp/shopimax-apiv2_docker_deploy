"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const createStorageErrors_1 = require("./createStorageErrors");
const storage_1 = require("../../../domain/storage/storage");
class CreateStorage {
    storageRepository;
    constructor(storageRepo) {
        this.storageRepository = storageRepo;
    }
    async execute(request, service) {
        try {
            const storageInstanceOrError = storage_1.Storage.create(request);
            if (storageInstanceOrError.isErr()) {
                return (0, neverthrow_1.err)(new createStorageErrors_1.CreateStorageBadRequestError(storageInstanceOrError.error));
            }
            const storageInstance = storageInstanceOrError.value;
            //verificar si el storage.email ya esta asignado
            // if (storageInstance.email) {
            //     let existingStorage = await this.storageRepository.getStorage({
            //         email: storageInstance.email
            //     })
            //     if (existingStorage) {
            //         return err(new StorageAlreadyRegisteredError('Storage Email already registered'))
            //     }
            // }
            const result = await this.storageRepository.createStorage(storageInstance);
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(error);
        }
    }
}
exports.default = CreateStorage;
