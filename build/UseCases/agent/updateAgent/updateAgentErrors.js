"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentUpdateAlreadyAssigned = exports.AgentUpdateIdNotValidError = exports.AgentUpdateBadRequestError = exports.AgentUpdateNotFoundError = void 0;
class AgentUpdateNotFoundError extends Error {
    constructor() {
        super('Agent not found.');
    }
}
exports.AgentUpdateNotFoundError = AgentUpdateNotFoundError;
class AgentUpdateIdNotValidError extends Error {
    constructor() {
        super('The provided ID is not valid.');
    }
}
exports.AgentUpdateIdNotValidError = AgentUpdateIdNotValidError;
class AgentUpdateAlreadyAssigned extends Error {
    constructor(message = 'Some values ​​have already been assigned to another Agent.') {
        super(message);
    }
}
exports.AgentUpdateAlreadyAssigned = AgentUpdateAlreadyAssigned;
class AgentUpdateBadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.AgentUpdateBadRequestError = AgentUpdateBadRequestError;
