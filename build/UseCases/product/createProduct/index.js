"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const repositories_1 = require("../../../repositories");
const createProduct_1 = __importDefault(require("./createProduct"));
const createProduct = new createProduct_1.default(repositories_1.productRepository);
exports.createProduct = createProduct;
