"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderFiltersSchema = exports.processOrderSchema = void 0;
exports.validateOrder = validateOrder;
exports.validateOrderDetail = validateOrderDetail;
const joi_1 = __importDefault(require("joi"));
const types_1 = require("../../types");
const utils_1 = require("../../utils");
const orderSchema = joi_1.default.object({
    orderNumber: joi_1.default.string().optional(),
    storeName: joi_1.default.string().required(),
    agency: joi_1.default.string().optional(),
    agent: joi_1.default.string().optional(),
    client: joi_1.default.object({
        name: joi_1.default.string().required(),
        lastname: joi_1.default.string().optional().allow(''),
        documentNumber: joi_1.default.string().optional().allow(''),
        phone: joi_1.default.string().optional().allow(''),
        country: joi_1.default.string().optional().allow(''),
        department: joi_1.default.string().optional().allow(''),
        province: joi_1.default.string().optional().allow(''),
        address: joi_1.default.string().optional().allow(''),
        reference: joi_1.default.string().optional().allow(''),
        email: joi_1.default.string().optional().allow('')
    }).required(),
    agencyCost: joi_1.default.number().required(),
    advancePayment: joi_1.default.number().required(),
    pendingPayment: joi_1.default.number().required(),
    subTotal: joi_1.default.number().required(),
    discount: joi_1.default.number().required(),
    total: joi_1.default.number().required(),
    orderDetail: joi_1.default.array()
        .items(joi_1.default.object({
        productId: joi_1.default.string().optional().allow(''),
        name: joi_1.default.string().required(),
        price: joi_1.default.number().required().min(1),
        quantity: joi_1.default.number().required().min(1),
        externalProductId: joi_1.default.alternatives(joi_1.default.string(), joi_1.default.number()).optional().allow(''),
        sku: joi_1.default.string().required().allow(''),
        comment: joi_1.default.string().optional().allow('')
    }))
        .optional(),
    deliveryType: joi_1.default.string().optional().allow(''),
    paymentMethod: joi_1.default.string().optional().allow(''),
    observation: joi_1.default.string().optional().allow(''),
    contactedStatus: joi_1.default.string().optional().allow(''),
    ...types_1.BaseOriginSchema
});
const orderDetailValidation = joi_1.default.object({
    order: joi_1.default.string().required().pattern(types_1.ObjectIdPattern),
    product: joi_1.default.string().optional().pattern(types_1.ObjectIdPattern),
    quantity: joi_1.default.number().required(),
    review: joi_1.default.string().optional(),
    customProduct: joi_1.default.object({
        name: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        externalProductId: joi_1.default.string().optional(),
        sku: joi_1.default.string().required()
    }).optional(),
    ...types_1.BaseOriginSchema,
    origin: joi_1.default.string().optional()
}).messages({
    'pattern.base': 'Invalid Id, received {#value} and expected a valid ObjectId'
});
const processOrderSchema = joi_1.default.object({
    order: joi_1.default.object({
        name: joi_1.default.string().required(),
        date: joi_1.default.string().optional()
    }).required(),
    products: joi_1.default.array()
        .items(joi_1.default.object({
        product_id: joi_1.default.number().required(),
        name: joi_1.default.string().required(),
        quantity: joi_1.default.string().required(),
        price: joi_1.default.string().required(),
        sku: joi_1.default.string().required()
    }))
        .required(),
    client: joi_1.default.object({
        first_name: joi_1.default.string().required(),
        last_name: joi_1.default.string().required(),
        phone: joi_1.default.string().required(),
        country: joi_1.default.string().required(),
        city: joi_1.default.string().required(),
        address: joi_1.default.string().required()
    }).required(),
    store: joi_1.default.object({
        app_id: joi_1.default.any().optional(),
        name: joi_1.default.string().required()
    }).required()
});
exports.processOrderSchema = processOrderSchema;
const getOrderFiltersSchema = joi_1.default.object({
    agency: joi_1.default.string().optional().allow(''),
    agent: joi_1.default.string().optional().allow(''),
    clientName: joi_1.default.string().optional().allow(''),
    clientDocumentNumber: joi_1.default.string().optional().allow(''),
    clientProvince: joi_1.default.string().optional().allow(''),
    clientPhone: joi_1.default.string().optional().allow(''),
    storeName: joi_1.default.string().optional().allow(''),
    orderNumber: joi_1.default.string().optional().allow(''),
    id: joi_1.default.string().optional().allow(''),
    status: joi_1.default.string().optional().allow('')
}).concat(utils_1.dateInputSchema);
exports.getOrderFiltersSchema = getOrderFiltersSchema;
function validateOrder(props) {
    return orderSchema.validate(props, { abortEarly: false });
}
function validateOrderDetail(props) {
    return orderDetailValidation.validate(props, { abortEarly: false });
}
