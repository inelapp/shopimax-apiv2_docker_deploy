"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorages = void 0;
const repositories_1 = require("../../../repositories");
const getStorages_1 = __importDefault(require("./getStorages"));
const getStorages = new getStorages_1.default(repositories_1.storageRepository);
exports.getStorages = getStorages;
