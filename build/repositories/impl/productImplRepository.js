"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImplRepository = void 0;
const mongo_schema_1 = require("../../db/mongo.schema");
const types_1 = require("../../types");
const mappers_1 = require("../../mappers");
const helpers_1 = require("../../helpers");
class ProductImplRepository {
    productModel;
    constructor() {
        this.productModel = mongo_schema_1.productModel;
    }
    async getProduct(filters) {
        try {
            const result = await (0, helpers_1.getDataByFilters)(mongo_schema_1.productModel, filters);
            if (!result) {
                return null;
            }
            return mappers_1.ProductMap.toDbFromDomain(result);
        }
        catch (error) {
            throw error;
        }
    }
    async getProducts(filters) {
        try {
            const { page, limit, ...query } = filters || {};
            const result = await (0, helpers_1.getPaginateAndFilteredData)(page, limit, mongo_schema_1.productModel, query);
            const productMap = result.data.map((product) => mappers_1.ProductMap.toDbFromDomain(product));
            return {
                data: productMap,
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
    async createProduct(product, registerStatus) {
        try {
            const newProduct = new this.productModel({
                ...product,
                registerStatus: registerStatus === types_1.DataStatus.VALID ? types_1.DataStatus.VALID : types_1.DataStatus.INVALID
            });
            return mappers_1.ProductMap.toDbFromDomain(await newProduct.save());
        }
        catch (error) {
            throw error;
        }
    }
    async updateProduct(id, product) {
        try {
            const updatedProduct = await this.productModel.findByIdAndUpdate(id, product, { new: true });
            if (!updatedProduct) {
                return null;
            }
            return mappers_1.ProductMap.toDbFromDomain(updatedProduct);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ProductImplRepository = ProductImplRepository;
