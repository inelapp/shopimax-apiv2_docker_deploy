"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const updateStorageErrors_1 = require("./updateStorageErrors");
const utils_1 = require("../../../utils");
const domain_1 = require("../../../domain");
const mongoose_1 = require("mongoose");
class UpdateStorage {
    storageRepository;
    constructor(storageRepo) {
        this.storageRepository = storageRepo;
    }
    async execute(request, service) {
        const { id, ...updateData } = request;
        try {
            // Validar formato del id
            if (!(0, mongoose_1.isValidObjectId)(id)) {
                return (0, neverthrow_1.err)(new updateStorageErrors_1.UpdateStorageIdNotValidError());
            }
            // verificar si updateData esta vacio
            if (Object.keys(updateData).length === 0) {
                return (0, neverthrow_1.err)(new updateStorageErrors_1.UpdateStorageBadRequestError('Empty petition is not accepted'));
            }
            // Verificar la existencia del agente
            const existingStorage = await this.storageRepository.getStorage({ id });
            if (!existingStorage) {
                return (0, neverthrow_1.err)(new updateStorageErrors_1.UpdateStorageNotFoundError());
            }
            // Validar los datos del request
            const { error } = (0, domain_1.validateUpdateStorageSchema)(updateData);
            if (error) {
                return (0, neverthrow_1.err)(new updateStorageErrors_1.UpdateStorageBadRequestError(error.details.map((e) => e.message).join('. ')));
            }
            // Actualizar el storage
            const updatedStorage = await this.storageRepository.updateStorage(id, updateData);
            if (!updatedStorage) {
                return (0, neverthrow_1.err)(new updateStorageErrors_1.UpdateStorageBadRequestError('Failed to update storage'));
            }
            return (0, neverthrow_1.ok)(updatedStorage);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = UpdateStorage;
