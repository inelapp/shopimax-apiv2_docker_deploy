"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProvider = void 0;
const repositories_1 = require("../../../repositories");
const updateProvider_1 = __importDefault(require("./updateProvider"));
const updateProvider = new updateProvider_1.default(repositories_1.providerRepository);
exports.updateProvider = updateProvider;
