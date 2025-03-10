"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const repositories_1 = require("../../../repositories");
const signup_1 = __importDefault(require("./signup"));
const signup = new signup_1.default(repositories_1.userRepository);
exports.signup = signup;
