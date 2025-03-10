"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProvider = void 0;
const repositories_1 = require("../../../repositories");
const createProvider_1 = __importDefault(require("./createProvider"));
const createProvider = new createProvider_1.default(repositories_1.providerRepository);
exports.createProvider = createProvider;
