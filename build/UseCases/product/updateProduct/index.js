"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = void 0;
const repositories_1 = require("../../../repositories");
const updateProduct_1 = __importDefault(require("./updateProduct"));
const updateProduct = new updateProduct_1.default(repositories_1.productRepository);
exports.updateProduct = updateProduct;
