"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageController = void 0;
const types_1 = require("../types");
const createStorage_1 = require("../UseCases/storage/createStorage");
const getStorages_1 = require("../UseCases/storage/getStorages");
const getStorage_1 = require("../UseCases/storage/getStorage");
const deleteStorage_1 = require("../UseCases/storage/deleteStorage");
const updateStorage_1 = require("../UseCases/storage/updateStorage");
const createStorageErrors_1 = require("../UseCases/storage/createStorage/createStorageErrors");
const utils_1 = require("../utils");
const getStoragesErrors_1 = require("../UseCases/storage/getStorages/getStoragesErrors");
const deleteStorageErrors_1 = require("../UseCases/storage/deleteStorage/deleteStorageErrors");
const getStorageErrors_1 = require("../UseCases/storage/getStorage/getStorageErrors");
const updateStorageErrors_1 = require("../UseCases/storage/updateStorage/updateStorageErrors");
class StorageController {
    constructor() {
        this.createStorage = this.createStorage.bind(this);
        this.getStorages = this.getStorages.bind(this);
        this.getStorage = this.getStorage.bind(this);
        this.deleteStorage = this.deleteStorage.bind(this);
        this.updateStorage = this.updateStorage.bind(this);
    }
    async createStorage(req, res) {
        const payload = req.body;
        const result = await createStorage_1.createStorage.execute(payload);
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case createStorageErrors_1.CreateStorageBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.CREATED);
    }
    async getStorages(req, res) {
        const { limit, page, ...filters } = req.query;
        const result = await getStorages_1.getStorages.execute({
            limit: Number(limit) || undefined,
            page: Number(page) || undefined,
            ...filters
        });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case getStoragesErrors_1.GetStoragesBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
    async getStorage(req, res) {
        const { id } = req.params;
        const result = await getStorage_1.getStorage.execute({ id });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case getStorageErrors_1.GetStorageNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                case getStorageErrors_1.GetStorageBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case getStorageErrors_1.GetStorageIdNotValidError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
    async updateStorage(req, res) {
        // Combina el ID de la URL con el cuerpo del request
        const updateRequest = {
            id: req.params.id,
            ...req.body
        };
        const result = await updateStorage_1.updateStorage.execute(updateRequest);
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case updateStorageErrors_1.UpdateStorageNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                case updateStorageErrors_1.UpdateStorageBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case updateStorageErrors_1.UpdateStorageIdNotValidError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case updateStorageErrors_1.UpdateStorageAlreadyAssigned:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
    async deleteStorage(req, res) {
        const { id } = req.params;
        const result = await deleteStorage_1.deleteStorage.execute({ id });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case deleteStorageErrors_1.DeleteStorageNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                case deleteStorageErrors_1.DeleteStorageBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
}
exports.StorageController = StorageController;
