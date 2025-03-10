"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderImplRepository = void 0;
const mongo_schema_1 = require("../../db/mongo.schema");
const helpers_1 = require("../../helpers");
const providerMap_1 = require("../../mappers/providerMap");
class ProviderImplRepository {
    providerModel;
    constructor() {
        this.providerModel = mongo_schema_1.providerModel;
    }
    async createProvider(provider) {
        try {
            const newProvider = new this.providerModel(provider);
            return providerMap_1.ProviderMap.toDomainFromDb(await newProvider.save());
        }
        catch (error) {
            throw error;
        }
    }
    async getProviders(filters) {
        try {
            const { page, limit, ...query } = filters || {};
            const result = await (0, helpers_1.getPaginateAndFilteredData)(page, limit, mongo_schema_1.providerModel, query);
            const providerMap = result.data.map((provider) => providerMap_1.ProviderMap.toDomainFromDb(provider));
            return {
                data: providerMap,
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
    async getProvider(filters) {
        try {
            const result = await (0, helpers_1.getDataByFilters)(mongo_schema_1.providerModel, filters);
            if (!result) {
                return null;
            }
            return providerMap_1.ProviderMap.toDomainFromDb(result);
        }
        catch (error) {
            throw error;
        }
    }
    async updateProvider(id, provider) {
        try {
            const updateProvider = await this.providerModel.findByIdAndUpdate(id, provider, { new: true });
            if (!updateProvider) {
                return null;
            }
            return providerMap_1.ProviderMap.toDomainFromDb(updateProvider);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteProvider(id) {
        try {
            const deleteProvider = await this.providerModel.findByIdAndDelete(id);
            if (!deleteProvider) {
                return null;
            }
            return providerMap_1.ProviderMap.toDomainFromDb(deleteProvider);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ProviderImplRepository = ProviderImplRepository;
