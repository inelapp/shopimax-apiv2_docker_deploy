"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = void 0;
const repositories_1 = require("../../../repositories");
const getProduct_1 = __importDefault(require("./getProduct"));
const getProduct = new getProduct_1.default(repositories_1.productRepository);
exports.getProduct = getProduct;
