"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgents = void 0;
const repositories_1 = require("../../../repositories");
const getAgents_1 = __importDefault(require("./getAgents"));
const getAgents = new getAgents_1.default(repositories_1.agentRepository);
exports.getAgents = getAgents;
