"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupUserUsernameAlreadyExistsError = exports.SignupUserEmailAlreadyExistsError = exports.SignupBadRequestError = void 0;
class SignupBadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.SignupBadRequestError = SignupBadRequestError;
class SignupUserEmailAlreadyExistsError extends Error {
    constructor() {
        super('User email already exists.');
    }
}
exports.SignupUserEmailAlreadyExistsError = SignupUserEmailAlreadyExistsError;
class SignupUserUsernameAlreadyExistsError extends Error {
    constructor() {
        super('User username already exists.');
    }
}
exports.SignupUserUsernameAlreadyExistsError = SignupUserUsernameAlreadyExistsError;
