"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productOriginSchema = void 0;
exports.validateProduct = validateProduct;
exports.validatePartialProduct = validatePartialProduct;
const joi_1 = __importDefault(require("joi"));
const types_1 = require("../../types");
const productSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    externalProductId: joi_1.default.string().optional(),
    sku: joi_1.default.string().required(),
    ...types_1.BaseOriginSchema
});
const productOriginSchema = joi_1.default.object({
    origin: joi_1.default.string()
        .required()
        .valid(...Object.values(types_1.OriginData))
});
exports.productOriginSchema = productOriginSchema;
const partialProductSchema = productSchema.fork(Object.keys(productSchema.describe().keys), (key) => key.optional());
function validateProduct(product) {
    return productSchema.validate(product, { abortEarly: false });
}
function validatePartialProduct(product) {
    return partialProductSchema.validate(product, { abortEarly: false });
}
