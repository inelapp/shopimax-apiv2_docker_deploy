"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStorage = void 0;
const createStorage_1 = __importDefault(require("./createStorage"));
const repositories_1 = require("../../../repositories");
const createStorage = new createStorage_1.default(repositories_1.storageRepository);
exports.createStorage = createStorage;
