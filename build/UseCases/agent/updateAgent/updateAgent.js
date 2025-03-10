"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const updateAgentErrors_1 = require("./updateAgentErrors");
const mongoose_1 = require("mongoose");
const domain_1 = require("../../../domain");
class UpdateAgent {
    agentRepository;
    constructor(agentRepo) {
        this.agentRepository = agentRepo;
    }
    async execute(request) {
        const { id, ...updateData } = request;
        try {
            if (!(0, mongoose_1.isValidObjectId)(id)) {
                return (0, neverthrow_1.err)(new updateAgentErrors_1.AgentUpdateIdNotValidError());
            }
            const existingAgent = await this.agentRepository.getAgent({ id });
            if (!existingAgent) {
                return (0, neverthrow_1.err)(new updateAgentErrors_1.AgentUpdateNotFoundError());
            }
            const { error, value } = (0, domain_1.validateUpdateAgentSchema)(updateData);
            if (error) {
                return (0, neverthrow_1.err)(new updateAgentErrors_1.AgentUpdateBadRequestError(error.details.map((e) => e.message).join('. ')));
            }
            const agentUpdateRequest = value;
            const existAgentDocumentNumber = await this.agentRepository.getAgent({ documentNumber: agentUpdateRequest?.documentNumber, $ne: { _id: id } });
            if (existAgentDocumentNumber) {
                return (0, neverthrow_1.err)(new updateAgentErrors_1.AgentUpdateBadRequestError('Document number is already in use.'));
            }
            const existAgentEmail = await this.agentRepository.getAgent({ email: agentUpdateRequest?.email, $ne: { _id: id } });
            if (existAgentEmail) {
                return (0, neverthrow_1.err)(new updateAgentErrors_1.AgentUpdateBadRequestError('Email is already in use.'));
            }
            const updatedAgent = await this.agentRepository.updateAgent(id, updateData);
            return (0, neverthrow_1.ok)(updatedAgent);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = UpdateAgent;
