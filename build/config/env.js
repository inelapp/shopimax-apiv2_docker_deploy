"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWAGGER_SCHEMA = exports.HOST = exports.JWT_SECRET = exports.MONGO_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3002;
exports.MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/express-mongo';
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.HOST = process.env.HOST || 'localhost:4000';
exports.SWAGGER_SCHEMA = process.env.SWAGGER_SCHEMA || 'http';
