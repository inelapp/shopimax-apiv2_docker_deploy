"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const repositories_1 = require("../../../repositories");
const createOrder_1 = __importDefault(require("./createOrder"));
const createOrder = new createOrder_1.default(repositories_1.orderRepository);
exports.createOrder = createOrder;
