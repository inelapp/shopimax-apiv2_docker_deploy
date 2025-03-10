"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const repositories_1 = require("../../../repositories");
const getProducts_1 = __importDefault(require("./getProducts"));
const getProducts = new getProducts_1.default(repositories_1.productRepository);
exports.getProducts = getProducts;
