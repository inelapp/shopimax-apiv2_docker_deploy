"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const getProductErrors_1 = require("./getProductErrors");
class GetProduct {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(request, service) {
        try {
            const result = await this.productRepository.getProduct(request);
            if (!result) {
                return (0, neverthrow_1.err)(new getProductErrors_1.GetProductNotFoundError());
            }
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = GetProduct;
