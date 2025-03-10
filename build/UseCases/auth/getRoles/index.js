"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoles = void 0;
const repositories_1 = require("../../../repositories");
const getRoles_1 = __importDefault(require("./getRoles"));
const getRoles = new getRoles_1.default(repositories_1.authRepository);
exports.getRoles = getRoles;
