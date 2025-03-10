"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStorage = void 0;
const repositories_1 = require("../../../repositories");
const updateStorage_1 = __importDefault(require("./updateStorage"));
const updateStorage = new updateStorage_1.default(repositories_1.storageRepository);
exports.updateStorage = updateStorage;
