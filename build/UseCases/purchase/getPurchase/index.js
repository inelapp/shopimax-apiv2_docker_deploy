"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPurchase = void 0;
const repositories_1 = require("../../../repositories");
const getPurchase_1 = __importDefault(require("./getPurchase"));
const getPurchase = new getPurchase_1.default(repositories_1.purchaseRepository);
exports.getPurchase = getPurchase;
