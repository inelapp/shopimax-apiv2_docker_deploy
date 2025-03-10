"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOrder = void 0;
const repositories_1 = require("../../../repositories");
const processOrder_1 = __importDefault(require("./processOrder"));
const processOrder = new processOrder_1.default(repositories_1.orderRepository);
exports.processOrder = processOrder;
