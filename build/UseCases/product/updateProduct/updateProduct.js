"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const updateProductErrors_1 = require("./updateProductErrors");
const mongoose_1 = require("mongoose");
const domain_1 = require("../../../domain");
const types_1 = require("../../../types");
class UpdateProduct {
    productRepository;
    constructor(productRespository) {
        this.productRepository = productRespository;
    }
    async execute(request) {
        try {
            const { id, ...data } = request;
            if (!id) {
                return (0, neverthrow_1.err)(new updateProductErrors_1.updateProductBadRequestError('The id is missing and must be provided'));
            }
            if (!(0, mongoose_1.isValidObjectId)(id)) {
                return (0, neverthrow_1.err)(new updateProductErrors_1.UpdateProductInvalidIdError());
            }
            const productExist = await this.productRepository.getProduct({ id });
            if (!productExist) {
                return (0, neverthrow_1.err)(new updateProductErrors_1.UpdateProductNotFoundError());
            }
            const productOrError = domain_1.Product.partialCreate(data);
            if (productOrError.isErr()) {
                return (0, neverthrow_1.err)(new updateProductErrors_1.updateProductBadRequestError(productOrError.error));
            }
            //validar que si el registerStatus es valid
            if (productOrError.value.registerStatus && productExist.registerStatus === types_1.DataStatus.VALID) {
                return (0, neverthrow_1.err)(new updateProductErrors_1.updateProductRegisterStatusUpdateNotAllowedError());
            }
            //Validar si se estan modificando para verificar coincidencias
            if (data.externalProductId || data.sku) {
                const externalProductIdAndSkuExist = await this.productRepository.getProduct({
                    externalProductId: data.externalProductId,
                    sku: data.sku
                });
                if (externalProductIdAndSkuExist) {
                    return (0, neverthrow_1.err)(new updateProductErrors_1.updateProductBadRequestError('Product with same externalProductId or sku already exists'));
                }
            }
            const result = await this.productRepository.updateProduct(id, productOrError.value);
            if (!result) {
                return (0, neverthrow_1.err)(new updateProductErrors_1.UpdateProductNotFoundError());
            }
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = UpdateProduct;
