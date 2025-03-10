"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
class GetAgents {
    agentRepository;
    constructor(agentRepository) {
        this.agentRepository = agentRepository;
    }
    async execute(request, service) {
        try {
            const result = await this.agentRepository.getAgents();
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = GetAgents;
