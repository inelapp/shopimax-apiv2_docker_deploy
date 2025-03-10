"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const neverthrow_1 = require("neverthrow");
const getStoragesErrors_1 = require("./getStoragesErrors");
class GetStorages {
    storageRepository;
    constructor(storageRepo) {
        this.storageRepository = storageRepo;
    }
    async execute(request, service) {
        try {
            const { page, limit, createdAt, updatedAt } = request;
            const validateFilters = (0, utils_1.createInstanceOrError)(utils_1.genericFiltersSchema, {
                page,
                limit,
                createdAt,
                updatedAt
            });
            if (validateFilters.isErr()) {
                return (0, neverthrow_1.err)(new getStoragesErrors_1.GetStoragesBadRequestError(validateFilters.error));
            }
            const result = await this.storageRepository.getStorages(request);
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = GetStorages;
