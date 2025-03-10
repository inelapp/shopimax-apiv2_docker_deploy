"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const getAgentErrors_1 = require("./getAgentErrors");
const mongoose_1 = require("mongoose");
class GetAgent {
    agentRepository;
    constructor(agentRepo) {
        this.agentRepository = agentRepo;
    }
    async execute(request, service) {
        try {
            // Validar formato del id
            if (!(0, mongoose_1.isValidObjectId)(request.id)) {
                return (0, neverthrow_1.err)(new getAgentErrors_1.GetAgentIdNotValidError());
            }
            // Buscar agente por filtros
            const agent = await this.agentRepository.getAgent(request);
            if (!agent) {
                return (0, neverthrow_1.err)(new getAgentErrors_1.GetAgentNotFoundError());
            }
            return (0, neverthrow_1.ok)(agent);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new getAgentErrors_1.GetAgentBadRequestError('An unexpected error occurred'));
        }
    }
}
exports.default = GetAgent;
