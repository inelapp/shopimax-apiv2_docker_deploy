"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProviders = void 0;
const repositories_1 = require("../../../repositories");
const getProviders_1 = __importDefault(require("./getProviders"));
const getProviders = new getProviders_1.default(repositories_1.providerRepository);
exports.getProviders = getProviders;
