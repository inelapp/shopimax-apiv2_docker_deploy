"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStorage = void 0;
const repositories_1 = require("../../../repositories");
const deleteStorage_1 = __importDefault(require("./deleteStorage"));
const deleteStorage = new deleteStorage_1.default(repositories_1.storageRepository);
exports.deleteStorage = deleteStorage;
