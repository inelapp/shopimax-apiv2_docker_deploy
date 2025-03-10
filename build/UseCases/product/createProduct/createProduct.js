"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const createProductErrors_1 = require("./createProductErrors");
const domain_1 = require("../../../domain");
const types_1 = require("../../../types");
class CreateProduct {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(request, service) {
        try {
            const { origin } = request;
            const validOrigin = (0, utils_1.createInstanceOrError)(domain_1.productOriginSchema, { origin });
            if (validOrigin.isErr()) {
                return (0, neverthrow_1.err)(new createProductErrors_1.CreateProductBadRequestError(validOrigin.error));
            }
            const productOrError = domain_1.Product.create(request);
            let error;
            let product;
            if (productOrError.isErr()) {
                error = productOrError.error;
            }
            else {
                product = productOrError.value;
            }
            const orderInvalidPayload = {
                ...request,
                comment: error
            };
            const existsProduct = await this.productRepository.getProduct({
                externalProductId: product?.externalProductId,
                sku: product?.sku
            });
            if (existsProduct && origin === types_1.OriginData.MANUAL) {
                return (0, neverthrow_1.err)(new createProductErrors_1.CreateProductBadRequestError('Product with same externalProductId or sku already exists'));
            }
            if (existsProduct && origin === types_1.OriginData.ONLINE) {
                return (0, neverthrow_1.ok)(existsProduct);
            }
            if (validOrigin.value.origin === types_1.OriginData.ONLINE) {
                if (error) {
                    return (0, neverthrow_1.ok)(await this.productRepository.createProduct(orderInvalidPayload, types_1.DataStatus.INVALID));
                }
                return (0, neverthrow_1.ok)(await this.productRepository.createProduct(request, types_1.DataStatus.VALID));
            }
            if (error) {
                return (0, neverthrow_1.err)(new createProductErrors_1.CreateProductBadRequestError(error));
            }
            const result = await this.productRepository.createProduct(product, types_1.DataStatus.VALID);
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = CreateProduct;
