"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAgentIdNotValidError = exports.GetAgentNotFoundError = exports.GetAgentBadRequestError = void 0;
class GetAgentBadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.GetAgentBadRequestError = GetAgentBadRequestError;
class GetAgentNotFoundError extends Error {
    constructor() {
        super('Agent not found');
    }
}
exports.GetAgentNotFoundError = GetAgentNotFoundError;
class GetAgentIdNotValidError extends Error {
    constructor() {
        super('The provided ID is not valid.');
    }
}
exports.GetAgentIdNotValidError = GetAgentIdNotValidError;
