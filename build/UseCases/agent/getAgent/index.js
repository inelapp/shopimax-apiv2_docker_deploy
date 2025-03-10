"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgent = void 0;
const getAgent_1 = __importDefault(require("./getAgent"));
const repositories_1 = require("../../../repositories");
const getAgent = new getAgent_1.default(repositories_1.agentRepository);
exports.getAgent = getAgent;
