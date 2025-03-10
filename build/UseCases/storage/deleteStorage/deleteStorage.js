"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const deleteStorageErrors_1 = require("./deleteStorageErrors");
const mongoose_1 = require("mongoose");
class DeleteStorage {
    storageRepository;
    constructor(storageRepo) {
        this.storageRepository = storageRepo;
    }
    async execute(request, service) {
        try {
            if (!(0, mongoose_1.isValidObjectId)(request.id)) {
                return (0, neverthrow_1.err)(new deleteStorageErrors_1.DeleteStorageBadRequestError('The provided ID is not valid.'));
            }
            const storageExist = await this.storageRepository.getStorage({ id: request.id });
            if (!storageExist) {
                return (0, neverthrow_1.err)(new deleteStorageErrors_1.DeleteStorageNotFoundError());
            }
            await this.storageRepository.deleteStorage(request.id);
            return (0, neverthrow_1.ok)({ message: 'Storage deleted successfully' });
        }
        catch (error) {
            return (0, neverthrow_1.err)(error);
        }
    }
}
exports.default = DeleteStorage;
