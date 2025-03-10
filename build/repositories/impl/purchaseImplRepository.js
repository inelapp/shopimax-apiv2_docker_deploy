"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseImplRepository = void 0;
const mongo_schema_1 = require("../../db/mongo.schema");
const purchaseMap_1 = require("../../mappers/purchaseMap");
const helpers_1 = require("../../helpers");
class PurchaseImplRepository {
    purchaseModel;
    constructor() {
        this.purchaseModel = mongo_schema_1.purchaseModel;
    }
    async createPurchase(purchase) {
        try {
            const newPurchase = new this.purchaseModel(purchase);
            const purchaseSaved = await newPurchase.save();
            return purchaseMap_1.PurchaseMap.toDomainFromDb(purchaseSaved);
        }
        catch (error) {
            throw error;
        }
    }
    async getPurchase(filters) {
        try {
            const result = await (0, helpers_1.getDataByFilters)(mongo_schema_1.purchaseModel, filters);
            if (!result) {
                return null;
            }
            return purchaseMap_1.PurchaseMap.toDomainFromDb(result);
        }
        catch (error) {
            throw error;
        }
    }
    async getPurchases(filters) {
        try {
            const { page, limit, ...query } = filters || {};
            const result = await (0, helpers_1.getPaginateAndFilteredData)(page, limit, mongo_schema_1.purchaseModel, query);
            const purchaseMap = result.data.map((purchase) => purchaseMap_1.PurchaseMap.toDomainFromDb(purchase));
            return {
                data: purchaseMap,
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
    async updatePurchase(id, purchase) {
        try {
            const updatedPurchase = await this.purchaseModel.findByIdAndUpdate(id, purchase, { new: true });
            if (!updatedPurchase) {
                return null;
            }
            return purchaseMap_1.PurchaseMap.toDomainFromDb(updatedPurchase);
        }
        catch (error) {
            throw error;
        }
    }
    async deltePurchase(id) {
        try {
            const deletePurchase = await this.purchaseModel.findByIdAndDelete(id);
            if (!deletePurchase) {
                return null;
            }
            return purchaseMap_1.PurchaseMap.toDomainFromDb(deletePurchase);
        }
        catch (error) {
            throw error;
        }
    }
    async getPurchaseByIdAndProductName(idPurchase, productName) {
        try {
            const purchase = await this.purchaseModel.findOne({
                _id: idPurchase,
                products: {
                    $elemMatch: { name: productName }
                }
            });
            if (!purchase) {
                return null;
            }
            return purchaseMap_1.PurchaseMap.toDomainFromDb(purchase);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.PurchaseImplRepository = PurchaseImplRepository;
