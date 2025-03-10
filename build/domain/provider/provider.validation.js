"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProvider = validateProvider;
exports.validatePartialProvider = validatePartialProvider;
const joi_1 = __importDefault(require("joi"));
const providerSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    ruc: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    addressLine: joi_1.default.string().optional(),
    email: joi_1.default.string().email().optional(),
    status: joi_1.default.string().required().valid('active', 'inactive'),
    referencePhoneNumber: joi_1.default.string().required(),
    referenceContactName: joi_1.default.string().required(),
    accountNumber: joi_1.default.string().optional(),
    businessCategory: joi_1.default.string().optional()
});
const partialProviderSchema = providerSchema.fork(Object.keys(providerSchema.describe().keys), (key) => key.optional());
function validateProvider(provider) {
    return providerSchema.validate(provider, { abortEarly: false });
}
function validatePartialProvider(provider) {
    return partialProviderSchema.validate(provider, { abortEarly: false });
}
