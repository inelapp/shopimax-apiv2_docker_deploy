"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedError = void 0;
class UnexpectedError extends Error {
    constructor(error) {
        console.error(error);
        super('An unexpected error occurred. Please try again later.');
        this.name = 'UnexpectedError';
    }
}
exports.UnexpectedError = UnexpectedError;
