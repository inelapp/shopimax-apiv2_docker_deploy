"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.compare = compare;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function encrypt(textPlain) {
    const hash = await bcryptjs_1.default.hash(textPlain, 10);
    return hash;
}
async function compare(passwordPlain, passwordHashed) {
    return bcryptjs_1.default.compare(passwordPlain, passwordHashed);
}
