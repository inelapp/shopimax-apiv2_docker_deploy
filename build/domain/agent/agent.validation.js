"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateAgentSchema = void 0;
exports.validateAgent = validateAgent;
const joi_1 = __importDefault(require("joi"));
const types_1 = require("../../types");
const agentSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    lastname: joi_1.default.string(),
    startWorkingTime: joi_1.default.string().required(),
    endWorkingTime: joi_1.default.string().required(),
    address: joi_1.default.string().allow('').optional(),
    documentNumber: joi_1.default.string(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string(),
    role: joi_1.default.string()
        .optional()
        .valid(...Object.values(types_1.Roles))
        .default(types_1.Roles.AGENT),
    status: joi_1.default.boolean().optional().default(true),
    registreStatus: joi_1.default.string()
        .optional()
        .valid(...Object.values(types_1.DataStatus))
        .default(types_1.DataStatus.VALID),
    assigned: joi_1.default.boolean().optional().default(false)
});
function validateAgent(agent) {
    return agentSchema.validate(agent, { abortEarly: false });
}
const updateAgentSchema = agentSchema.fork(Object.keys(agentSchema.describe().keys), (schema) => schema.optional());
const validateUpdateAgentSchema = (update) => {
    return updateAgentSchema.validate(update, { abortEarly: false });
};
exports.validateUpdateAgentSchema = validateUpdateAgentSchema;
