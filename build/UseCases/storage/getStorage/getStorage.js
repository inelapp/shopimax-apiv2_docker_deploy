"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const getStorageErrors_1 = require("./getStorageErrors");
const utils_1 = require("../../../utils");
const mongoose_1 = require("mongoose");
class GetStorage {
    storageRepository;
    constructor(storageRepo) {
        this.storageRepository = storageRepo;
    }
    async execute(request, service) {
        try {
            if (!(0, mongoose_1.isValidObjectId)(request.id)) {
                return (0, neverthrow_1.err)(new getStorageErrors_1.GetStorageIdNotValidError());
            }
            const result = await this.storageRepository.getStorage(request);
            if (!result) {
                return (0, neverthrow_1.err)(new getStorageErrors_1.GetStorageNotFoundError());
            }
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = GetStorage;
