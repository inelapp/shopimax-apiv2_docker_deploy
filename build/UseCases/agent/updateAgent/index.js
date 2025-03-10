"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAgent = void 0;
const repositories_1 = require("../../../repositories");
const updateAgent_1 = __importDefault(require("./updateAgent"));
const updateAgent = new updateAgent_1.default(repositories_1.agentRepository);
exports.updateAgent = updateAgent;
