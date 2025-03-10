"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateInputSchema = exports.genericFiltersSchema = void 0;
exports.createInstanceOrError = createInstanceOrError;
const joi_1 = __importDefault(require("joi"));
const neverthrow_1 = require("neverthrow");
function requestValidator(schema, data) {
    return schema.validate(data, { abortEarly: false, convert: false });
}
function createInstanceOrError(schema, data) {
    const { error } = requestValidator(schema, data);
    if (error) {
        const errors = error.details.map((detail) => detail.message).join('. ');
        return (0, neverthrow_1.err)(errors);
    }
    return (0, neverthrow_1.ok)(data);
}
const dateInputPattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
const genericFiltersSchema = joi_1.default.object({
    limit: joi_1.default.number().integer().min(1).optional(),
    page: joi_1.default.number().integer().min(1).optional(),
    createdAt: joi_1.default.date().optional(),
    updatedAt: joi_1.default.date().optional()
});
exports.genericFiltersSchema = genericFiltersSchema;
const dateInputSchema = joi_1.default.object({
    toDate: joi_1.default.string().regex(dateInputPattern).optional().messages({
        'string.pattern.base': 'Invalid date format, received {#value} and expected YYYY-MM-DD HH:mm:ss'
    }),
    fromDate: joi_1.default.string().regex(dateInputPattern).optional().messages({
        'string.pattern.base': 'Invalid date format, received {#value} and expected YYYY-MM-DD HH:mm:ss'
    }),
    createdAt: joi_1.default.date().optional(),
    updatedAt: joi_1.default.date().optional()
});
exports.dateInputSchema = dateInputSchema;
