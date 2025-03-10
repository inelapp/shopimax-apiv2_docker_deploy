"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorage = void 0;
const repositories_1 = require("../../../repositories");
const getStorage_1 = __importDefault(require("./getStorage"));
const getStorage = new getStorage_1.default(repositories_1.storageRepository);
exports.getStorage = getStorage;
