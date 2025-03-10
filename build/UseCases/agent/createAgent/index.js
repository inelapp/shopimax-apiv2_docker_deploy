"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAgent = void 0;
const createAgent_1 = __importDefault(require("./createAgent"));
const repositories_1 = require("../../../repositories");
const createAgent = new createAgent_1.default(repositories_1.agentRepository, repositories_1.userRepository);
exports.createAgent = createAgent;
