"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.roleModel = exports.purchaseModel = exports.storageModel = exports.providerModel = exports.agentModel = exports.orderDetailModel = exports.orderModel = exports.productModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const types_1 = require("../types");
const utils_1 = require("../utils");
mongoose_1.default.plugin((schema) => {
    schema.set('timestamps', true);
    schema.set('versionKey', false);
});
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    externalProductId: { type: String },
    sku: { type: String, default: '' },
    origin: { type: String, enum: Object.values(types_1.OriginData), required: true },
    comment: { type: String, default: '' },
    registerStatus: { type: String, enum: Object.values(types_1.DataStatus), required: true },
    status: { type: String, enum: Object.values(types_1.DataStatus), default: types_1.DataStatus.ACTIVE, required: true }
});
const agentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    lastname: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: false, default: null },
    startWorkingTime: { type: String, required: true },
    endWorkingTime: { type: String, required: true },
    address: { type: String },
    documentNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    phone: { type: String },
    role: { type: String, enum: Object.values(types_1.Roles), required: true, default: types_1.Roles.AGENT },
    status: { type: Boolean, required: true, default: true },
    registreStatus: { type: String, required: true, default: 'active' },
    assigned: { type: Boolean, required: true, default: false }
});
const orderSchema = new mongoose_1.Schema({
    orderNumber: { type: String },
    storeName: { type: String, required: true },
    agency: { type: String },
    agent: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Agent', required: false, default: null },
    client: {
        _id: { type: String },
        name: { type: String },
        lastname: { type: String },
        documentNumber: { type: String },
        phone: { type: String },
        country: { type: String },
        department: { type: String },
        province: { type: String },
        email: { type: String },
        address: { type: String },
        reference: { type: String }
    },
    agencyCost: { type: Number, required: true, default: 0 },
    advancePayment: { type: Number, required: true, default: 0 },
    pendingPayment: { type: Number, required: true, default: 0 },
    subtotal: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },
    orderDetail: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'OrderDetail', default: null }],
    deliveryType: { type: String },
    paymentMethod: { type: String },
    observation: { type: String },
    contactedStatus: { type: String },
    comment: { type: String },
    origin: { type: String, enum: Object.values(types_1.OriginData), required: true },
    registerStatus: { type: String, enum: Object.values(types_1.DataStatus), required: true },
    status: { type: String, enum: Object.values(types_1.OrderStatus), default: types_1.OrderStatus.NEW }
});
const orderDetailSchema = new mongoose_1.Schema({
    order: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Order', required: true },
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: false, default: null },
    quantity: { type: Number, required: true },
    comment: { type: String },
    review: { type: String },
    customProduct: {
        name: { type: String },
        price: { type: Number },
        externalProductId: { type: String },
        sku: { type: String }
    }
});
const providerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    ruc: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    addressLine: { type: String },
    email: { type: String },
    status: { type: String, enum: Object.values(types_1.DataStatus), required: true, default: types_1.DataStatus.ACTIVE },
    referencePhoneNumber: { type: String, required: true },
    referenceContactName: { type: String, required: true },
    accountNumber: { type: String },
    businessCategory: { type: String }
});
const storageSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    capacity: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: Object.values(types_1.DataStatus).filter((status) => status === types_1.DataStatus.ACTIVE || status === types_1.DataStatus.INACTIVE)
    }
});
const purchaseSchema = new mongoose_1.Schema({
    products: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            boxes: { type: Number },
            sku: { type: String }
        }
    ],
    referencePurchaseNumber: { type: String },
    provider: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Provider', required: true },
    storage: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Storage', required: true },
    confirmed: { type: Boolean, required: true },
    subTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    discount: { type: Number },
    observation: { type: String },
    currency: { type: String, required: true },
    paymentType: { type: String, required: true },
    conditionPayment: { type: String, required: true },
    paymentReference: { type: String, required: true },
    numberOfBoxes: { type: Number },
    active: { type: Boolean, required: true }
});
const roleSchema = new mongoose_1.Schema({
    name: { type: String },
    description: { type: String },
    status: { type: String, enum: Object.values(types_1.DataStatus), required: true, default: types_1.DataStatus.ACTIVE },
    permissions: [{ type: String }]
});
const userSchema = new mongoose_1.Schema({
    email: { type: String, unique: true },
    username: { type: String },
    password: { type: String },
    roles: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Role'
        }],
    status: { type: String, enum: Object.values(types_1.DataStatus), required: true, default: types_1.DataStatus.ACTIVE },
});
userSchema.pre('save', async function (next) {
    this.password = await (0, utils_1.encrypt)(this.password);
    next();
});
const productModel = (0, mongoose_1.model)('Product', productSchema, 'products');
exports.productModel = productModel;
const orderModel = (0, mongoose_1.model)('Order', orderSchema, 'orders');
exports.orderModel = orderModel;
const orderDetailModel = (0, mongoose_1.model)('OrderDetail', orderDetailSchema, 'orderDetails');
exports.orderDetailModel = orderDetailModel;
const agentModel = (0, mongoose_1.model)('Agent', agentSchema, 'agents');
exports.agentModel = agentModel;
const providerModel = (0, mongoose_1.model)('Provider', providerSchema, 'providers');
exports.providerModel = providerModel;
const storageModel = (0, mongoose_1.model)('Storage', storageSchema, 'storages');
exports.storageModel = storageModel;
const purchaseModel = (0, mongoose_1.model)('Purchase', purchaseSchema, 'Purchases');
exports.purchaseModel = purchaseModel;
const roleModel = (0, mongoose_1.model)('Role', roleSchema, 'roles');
exports.roleModel = roleModel;
const userModel = (0, mongoose_1.model)('User', userSchema, 'users');
exports.userModel = userModel;
