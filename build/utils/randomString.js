"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ramdonString = ramdonString;
exports.generateOrderNumber = generateOrderNumber;
function ramdonString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
function generateOrderNumber(ordersLength) {
    return `ORD-MANUAL#${ordersLength.toString().padStart(6, '0')}`;
}
