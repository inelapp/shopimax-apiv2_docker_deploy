"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageImplRepository = void 0;
const helpers_1 = require("../../helpers");
const mongo_schema_1 = require("../../db/mongo.schema");
const storageMap_1 = require("../../mappers/storageMap");
class StorageImplRepository {
    storageModel;
    constructor() {
        this.storageModel = mongo_schema_1.storageModel;
    }
    async getStorages(filters) {
        try {
            const { page, limit, ...query } = filters || {};
            const result = await (0, helpers_1.getPaginateAndFilteredData)(page, limit, this.storageModel, query);
            const storageMap = result.data.map((storage) => storageMap_1.StorageMap.toDbFromDomain(storage));
            return {
                data: storageMap,
                page: result.page,
                limit: result.limit,
                totalRecords: result.totalRecords,
                totalPages: result.totalPages
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getStorage(filters) {
        try {
            const result = await (0, helpers_1.getDataByFilters)(mongo_schema_1.storageModel, filters);
            if (!result) {
                return null;
            }
            return storageMap_1.StorageMap.toDbFromDomain(result);
        }
        catch (error) {
            throw error;
        }
    }
    async createStorage(request) {
        try {
            const newStorage = new this.storageModel(request);
            await newStorage.save();
            return storageMap_1.StorageMap.toDbFromDomain(newStorage);
        }
        catch (error) {
            throw error;
        }
    }
    async updateStorage(id, storage) {
        try {
            // Verificar si el email ya esta en uso
            // if (storage.email) {
            //     const existingStorage = await this.storageModel.findOne({
            //         email: storage.email,
            //         _id: { $ne: id },
            //     })
            //     if (existingStorage) {
            //         throw new UpdateStorageAlreadyAssigned("The Email is Already in use. ")
            //     }
            // }
            const updateStorage = await this.storageModel.findByIdAndUpdate(id, storage, { new: true });
            if (!updateStorage) {
                return null;
            }
            return storageMap_1.StorageMap.toDbFromDomain(updateStorage);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteStorage(id) {
        try {
            const result = await this.storageModel.findByIdAndDelete(id);
            return result != null;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.StorageImplRepository = StorageImplRepository;
