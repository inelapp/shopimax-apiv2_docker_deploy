"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseOriginSchema = exports.ObjectIdPattern = void 0;
const joi_1 = __importDefault(require("joi"));
const origins_1 = require("./origins");
exports.ObjectIdPattern = /^[0-9a-fA-F]{24}$/;
exports.BaseOriginSchema = {
    origin: joi_1.default.string()
        .required()
        .valid(...Object.values(origins_1.OriginData)),
    comment: joi_1.default.string().optional(),
    registerStatus: joi_1.default.string()
        .optional()
        .valid(...Object.values(origins_1.DataStatus)),
    status: joi_1.default.string()
        .optional()
        .valid(...Object.values(origins_1.DataStatus))
        .default(origins_1.DataStatus.ACTIVE)
        .allow('', null)
};
