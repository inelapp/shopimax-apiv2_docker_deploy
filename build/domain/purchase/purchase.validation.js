"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePurchaseSchema = exports.purchaseFiltersSchema = exports.purchaseSchema = void 0;
exports.validatePurchase = validatePurchase;
exports.validatePurchaseFilters = validatePurchaseFilters;
const joi_1 = __importDefault(require("joi"));
const types_1 = require("../../types");
const purchaseSchema = joi_1.default.object({
    products: joi_1.default.array()
        .items(joi_1.default.object({
        name: joi_1.default.string().required(),
        quantity: joi_1.default.number().required(),
        price: joi_1.default.number().required(),
        boxes: joi_1.default.number().optional(),
        sku: joi_1.default.string().optional()
    }))
        .required(),
    referencePurchaseNumber: joi_1.default.string().optional(),
    provider: joi_1.default.string()
        .required()
        .pattern(types_1.ObjectIdPattern)
        .messages({ 'string.pattern.base': 'Invalid "provider" object id' }),
    storage: joi_1.default.string()
        .required()
        .pattern(types_1.ObjectIdPattern)
        .messages({ 'string.pattern.base': 'Invalid "storage" object id' }),
    confirmed: joi_1.default.boolean().required(),
    subTotal: joi_1.default.number().required(),
    total: joi_1.default.number().required(),
    discount: joi_1.default.number().optional(),
    observation: joi_1.default.string().optional(),
    currency: joi_1.default.string().required(),
    paymentType: joi_1.default.string().required(),
    conditionPayment: joi_1.default.string().required(),
    paymentReference: joi_1.default.string().required(),
    numberOfBoxes: joi_1.default.number().optional(),
    active: joi_1.default.boolean().required()
});
exports.purchaseSchema = purchaseSchema;
const purchaseFiltersSchema = joi_1.default.object({
    id: joi_1.default.string().optional().pattern(types_1.ObjectIdPattern).messages({ 'string.pattern.base': 'Invalid "id" object id' }),
    referencePurchaseNumber: joi_1.default.string().optional(),
    provider: joi_1.default.string()
        .optional()
        .pattern(types_1.ObjectIdPattern)
        .messages({ 'string.pattern.base': 'Invalid "provider" object id' }),
    storage: joi_1.default.string()
        .optional()
        .pattern(types_1.ObjectIdPattern)
        .messages({ 'string.pattern.base': 'Invalid "storage" object id' }),
    confirmed: joi_1.default.boolean().optional(),
    currency: joi_1.default.string().optional(),
    paymentType: joi_1.default.string().optional(),
    conditionPayment: joi_1.default.string().optional(),
    paymentReference: joi_1.default.string().optional(),
    active: joi_1.default.boolean().optional()
});
exports.purchaseFiltersSchema = purchaseFiltersSchema;
const updatePurchaseSchema = purchaseSchema.fork(Object.keys(purchaseSchema.describe().keys), (key) => key.optional());
exports.updatePurchaseSchema = updatePurchaseSchema;
function validatePurchase(props) {
    return purchaseSchema.validate(props, { abortEarly: false });
}
function validatePurchaseFilters(props) {
    return purchaseFiltersSchema.validate(props, { abortEarly: false });
}
