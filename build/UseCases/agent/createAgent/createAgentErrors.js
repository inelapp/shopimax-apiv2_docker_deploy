"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentInvalidEmailError = exports.AgentMissingWorkingTimeError = exports.AgentInvalidDataStatusError = exports.AgentInvalidRoleError = exports.AgentAlreadyRegisteredError = exports.CreateAgentBadRequestError = void 0;
class CreateAgentBadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.CreateAgentBadRequestError = CreateAgentBadRequestError;
class AgentAlreadyRegisteredError extends Error {
    constructor(message = 'Agent already registered') {
        super(message);
    }
}
exports.AgentAlreadyRegisteredError = AgentAlreadyRegisteredError;
class AgentInvalidRoleError extends Error {
    constructor() {
        super('Invalid role: the role must be one of the predefined roles');
    }
}
exports.AgentInvalidRoleError = AgentInvalidRoleError;
class AgentInvalidDataStatusError extends Error {
    constructor() {
        super('Invalid data status: the status must be one of the predefined statuses');
    }
}
exports.AgentInvalidDataStatusError = AgentInvalidDataStatusError;
class AgentMissingWorkingTimeError extends Error {
    constructor() {
        super('Invalid working time: startWorkingTime and endWorkingTime must be valid and required');
    }
}
exports.AgentMissingWorkingTimeError = AgentMissingWorkingTimeError;
class AgentInvalidEmailError extends Error {
    constructor() {
        super('Invalid email format');
    }
}
exports.AgentInvalidEmailError = AgentInvalidEmailError;
