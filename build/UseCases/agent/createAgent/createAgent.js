"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const createAgentErrors_1 = require("./createAgentErrors");
const domain_1 = require("../../../domain");
class CreateAgent {
    agentRepository;
    userRepository;
    constructor(agentRepository, userRepository) {
        this.agentRepository = agentRepository;
        this.userRepository = userRepository;
    }
    async execute(request, service) {
        try {
            const agentInstanceOrError = domain_1.Agent.create(request);
            if (agentInstanceOrError.isErr()) {
                return (0, neverthrow_1.err)(new createAgentErrors_1.CreateAgentBadRequestError(agentInstanceOrError.error));
            }
            const agentInstance = agentInstanceOrError.value;
            const userByEmail = await this.userRepository.getUser({
                email: agentInstance.email
            });
            if (userByEmail) {
                return (0, neverthrow_1.err)(new createAgentErrors_1.AgentAlreadyRegisteredError('Agent Email already registered'));
            }
            const agentByDocumentNumber = await this.agentRepository.getAgent({
                documentNumber: agentInstance.documentNumber
            });
            if (agentByDocumentNumber) {
                return (0, neverthrow_1.err)(new createAgentErrors_1.AgentAlreadyRegisteredError('Agent Document Number already registered'));
            }
            const result = await this.agentRepository.createAgent(agentInstance);
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = CreateAgent;
