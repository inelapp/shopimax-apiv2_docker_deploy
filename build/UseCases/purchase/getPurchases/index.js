"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPurchases = void 0;
const repositories_1 = require("../../../repositories");
const getPurchases_1 = __importDefault(require("./getPurchases"));
const getPurchases = new getPurchases_1.default(repositories_1.purchaseRepository);
exports.getPurchases = getPurchases;
