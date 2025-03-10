"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderNumberCode = generateOrderNumberCode;
exports.getRandomValueFromArray = getRandomValueFromArray;
function generateOrderNumberCode(totalOrders) {
    return totalOrders.toString().padStart(6, '0');
}
function getRandomValueFromArray(array) {
    if (array.length === 0) {
        return undefined; // Retorna undefined si el array está vacío
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
