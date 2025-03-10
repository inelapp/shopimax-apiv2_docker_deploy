"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentController = void 0;
const types_1 = require("../types");
const getAgents_1 = require("../UseCases/agent/getAgents");
const getAgent_1 = require("../UseCases/agent/getAgent");
const utils_1 = require("../utils");
const createAgent_1 = require("../UseCases/agent/createAgent");
const updateAgent_1 = require("../UseCases/agent/updateAgent");
const createAgentErrors_1 = require("../UseCases/agent/createAgent/createAgentErrors");
const getAgentErrors_1 = require("../UseCases/agent/getAgent/getAgentErrors");
const updateAgentErrors_1 = require("../UseCases/agent/updateAgent/updateAgentErrors");
class AgentController {
    constructor() {
        this.getAgents = this.getAgents.bind(this);
        this.createAgent = this.createAgent.bind(this);
        this.getAgent = this.getAgent.bind(this);
    }
    async getAgents(req, res) {
        const result = await getAgents_1.getAgents.execute({});
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                default:
                    return (0, utils_1.response)(res, error, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
    async getAgent(req, res) {
        const { id } = req.params;
        const result = await getAgent_1.getAgent.execute({ id });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case getAgentErrors_1.GetAgentIdNotValidError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case getAgentErrors_1.GetAgentNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                case getAgentErrors_1.GetAgentBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
    async createAgent(req, res) {
        const agentData = req.body;
        const result = await createAgent_1.createAgent.execute(agentData);
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case createAgentErrors_1.AgentAlreadyRegisteredError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.CONFLICT, error.constructor.name);
                case createAgentErrors_1.CreateAgentBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.CREATED);
    }
    async updateAgent(req, res) {
        // Combina el ID de la URL con el cuerpo del request
        const updateRequest = {
            id: req.params.id,
            ...req.body
        };
        const result = await updateAgent_1.updateAgent.execute(updateRequest);
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case updateAgentErrors_1.AgentUpdateNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                case updateAgentErrors_1.AgentUpdateBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case updateAgentErrors_1.AgentUpdateIdNotValidError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case updateAgentErrors_1.AgentUpdateAlreadyAssigned:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
}
exports.AgentController = AgentController;
