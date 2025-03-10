"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = void 0;
const repositories_1 = require("../../../repositories");
const getOrders_1 = __importDefault(require("./getOrders"));
const getOrders = new getOrders_1.default(repositories_1.orderRepository);
exports.getOrders = getOrders;
