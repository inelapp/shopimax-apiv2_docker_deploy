"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvider = void 0;
const repositories_1 = require("../../../repositories");
const getProvider_1 = __importDefault(require("./getProvider"));
const getProvider = new getProvider_1.default(repositories_1.providerRepository);
exports.getProvider = getProvider;
