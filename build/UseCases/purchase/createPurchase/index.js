"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchase = void 0;
const repositories_1 = require("../../../repositories");
const createPurchase_1 = __importDefault(require("./createPurchase"));
const createPurchase = new createPurchase_1.default(repositories_1.purchaseRepository, repositories_1.providerRepository, repositories_1.storageRepository);
exports.createPurchase = createPurchase;
