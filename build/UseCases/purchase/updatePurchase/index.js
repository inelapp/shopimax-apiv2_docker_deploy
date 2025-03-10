"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePurchase = void 0;
const repositories_1 = require("../../../repositories");
const updatePurchase_1 = __importDefault(require("./updatePurchase"));
const updatePurchase = new updatePurchase_1.default(repositories_1.purchaseRepository, repositories_1.providerRepository, repositories_1.storageRepository);
exports.updatePurchase = updatePurchase;
