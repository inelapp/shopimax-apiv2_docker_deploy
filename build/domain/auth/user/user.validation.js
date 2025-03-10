"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    roles: joi_1.default.array().items(joi_1.default.string()).optional().allow(null, ''),
    status: joi_1.default.string().optional().allow(null, ''),
    username: joi_1.default.string().optional().allow(null, ''),
});
const userValidationSchema = (user) => {
    return userSchema.validate(user, { abortEarly: false, convert: false });
};
exports.userValidationSchema = userValidationSchema;
