"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const createProduct_1 = require("../UseCases/product/createProduct");
const createProductErrors_1 = require("../UseCases/product/createProduct/createProductErrors");
const utils_1 = require("../utils");
const types_1 = require("../types");
const getProducts_1 = require("../UseCases/product/getProducts");
const getProductsErrors_1 = require("../UseCases/product/getProducts/getProductsErrors");
const getProduct_1 = require("../UseCases/product/getProduct");
const getProductErrors_1 = require("../UseCases/product/getProduct/getProductErrors");
const updateProduct_1 = require("../UseCases/product/updateProduct");
const updateProductErrors_1 = require("../UseCases/product/updateProduct/updateProductErrors");
class ProductController {
    constructor() {
        this.createProduct = this.createProduct.bind(this);
    }
    async createProduct(req, res) {
        const { name, price, origin, registerStatus, status, comment, externalProductId, sku } = req.body;
        const result = await createProduct_1.createProduct.execute({
            name,
            price,
            origin,
            registerStatus,
            status,
            comment,
            externalProductId,
            sku
        });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case createProductErrors_1.CreateProductBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.CREATED);
    }
    async getProducts(req, res) {
        const { limit, page, ...filters } = req.query;
        const result = await getProducts_1.getProducts.execute({
            limit: Number(limit) || undefined,
            page: Number(page) || undefined,
            ...filters
        });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case getProductsErrors_1.GetProductsBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
    async getProduct(req, res) {
        const { id } = req.params;
        const result = await getProduct_1.getProduct.execute({ id });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case getProductErrors_1.GetProductNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
    async updateProduct(req, res) {
        const { id, name, price, externalProductId, comment, sku, registerStatus, status } = req.body;
        const result = await updateProduct_1.updateProduct.execute({
            id,
            name,
            price,
            externalProductId,
            comment,
            sku,
            registerStatus,
            status
        });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case updateProductErrors_1.UpdateProductNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                case updateProductErrors_1.updateProductBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case updateProductErrors_1.updateProductRegisterStatusUpdateNotAllowedError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
}
exports.ProductController = ProductController;
