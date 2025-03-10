"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateStorageSchema = void 0;
exports.validateStorage = validateStorage;
const joi_1 = __importDefault(require("joi"));
const types_1 = require("../../types");
const storageSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    capacity: joi_1.default.string().required(),
    status: joi_1.default.string()
        .required()
        .valid(...Object.values(types_1.DataStatus).filter((status) => status === types_1.DataStatus.ACTIVE || status === types_1.DataStatus.INACTIVE))
});
function validateStorage(storage) {
    return storageSchema.validate(storage, { abortEarly: false });
}
const updateStorageSchema = storageSchema.fork(Object.keys(storageSchema.describe().keys), (schema) => schema.optional());
const validateUpdateStorageSchema = (update) => {
    return updateStorageSchema.validate(update, { abortEarly: false });
};
exports.validateUpdateStorageSchema = validateUpdateStorageSchema;
