"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const getProductsErrors_1 = require("./getProductsErrors");
class GetProducts {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
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
                return (0, neverthrow_1.err)(new getProductsErrors_1.GetProductsBadRequestError(validateFilters.error));
            }
            const result = await this.productRepository.getProducts(request);
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = GetProducts;
