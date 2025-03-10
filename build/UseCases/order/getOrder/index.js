"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = void 0;
const repositories_1 = require("../../../repositories");
const getOrder_1 = __importDefault(require("./getOrder"));
const getOrder = new getOrder_1.default(repositories_1.orderRepository);
exports.getOrder = getOrder;
