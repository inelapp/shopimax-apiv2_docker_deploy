"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
const types_1 = require("../../types");
const neverthrow_1 = require("neverthrow");
const agent_validation_1 = require("./agent.validation");
class Agent {
    id;
    name;
    lastname;
    startWorkingTime;
    endWorkingTime;
    address;
    documentNumber;
    email;
    phone;
    role = types_1.Roles.AGENT;
    user;
    status;
    registreStatus;
    assigned;
    constructor(props) {
        Object.assign(this, props);
    }
    static create(props) {
        const { error } = (0, agent_validation_1.validateAgent)(props);
        if (error) {
            const agentErrors = error.details.map((error) => error.message).join('. ');
            return (0, neverthrow_1.err)(agentErrors);
        }
        return (0, neverthrow_1.ok)(new Agent(props));
    }
    static update(props) {
        const { error } = (0, agent_validation_1.validateUpdateAgentSchema)(props);
        if (error) {
            const agentError = error.details
                .map((e) => {
                e.message;
            })
                .join('. ');
            return (0, neverthrow_1.err)(agentError);
        }
        return (0, neverthrow_1.ok)(new Agent(props));
    }
}
exports.Agent = Agent;
