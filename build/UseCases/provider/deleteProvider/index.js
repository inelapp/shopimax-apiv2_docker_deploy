"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProvider = void 0;
const repositories_1 = require("../../../repositories");
const deleteProvider_1 = __importDefault(require("./deleteProvider"));
const deleteProvider = new deleteProvider_1.default(repositories_1.providerRepository);
exports.deleteProvider = deleteProvider;
