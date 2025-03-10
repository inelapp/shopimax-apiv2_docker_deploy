"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentImplRepository = void 0;
const mongo_schema_1 = require("../../db/mongo.schema");
const mappers_1 = require("../../mappers");
const helpers_1 = require("../../helpers");
class AgentImplRepository {
    agentModel;
    userModel;
    roleModel;
    constructor() {
        this.agentModel = mongo_schema_1.agentModel;
        this.userModel = mongo_schema_1.userModel;
        this.roleModel = mongo_schema_1.roleModel;
    }
    async getAgents(filters) {
        try {
            const agents = await (0, helpers_1.getDataByFilterWithoutPagination)(this.agentModel, filters, [{ path: 'user', populate: 'roles' }]);
            return agents.map((agent) => mappers_1.AgentMap.toDbFromDomain(agent));
        }
        catch (error) {
            throw error;
        }
    }
    async getAgent(filters) {
        try {
            const result = await (0, helpers_1.getDataByFilters)(this.agentModel, filters, [{ path: 'user', populate: 'roles' }]);
            if (!result) {
                return null;
            }
            return mappers_1.AgentMap.toDbFromDomain(result);
        }
        catch (error) {
            throw error;
        }
    }
    async createAgent(agent) {
        const session = await this.agentModel.startSession();
        try {
            return await session.withTransaction(async () => {
                const role = await this.roleModel.findOne({ name: agent.role || 'asesor' }, null, { session });
                const newUser = new this.userModel({
                    email: agent.email,
                    password: 'ShopimaxPass2025#',
                    username: agent.name || '',
                    roles: [role?._id]
                });
                const userSaved = await newUser.save({ session });
                const newAgent = new this.agentModel({ ...agent, user: userSaved?._id }, null, { session });
                const agentSaved = await newAgent.save({ session });
                const agentById = await (0, helpers_1.getDataByFilters)(this.agentModel, { id: agentSaved?._id?.toString() }, [{ path: 'user', populate: 'roles' }], session);
                return mappers_1.AgentMap.toDbFromDomain(agentById);
            });
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            await session.endSession();
        }
    }
    async updateAgent(id, agent) {
        try {
            const updatedAgent = await this.agentModel.findByIdAndUpdate(id, agent, { new: true });
            const agentById = await (0, helpers_1.getDataByFilters)(this.agentModel, { id: updatedAgent?._id?.toString() });
            return mappers_1.AgentMap.toDbFromDomainWithoutDetail(agentById);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.AgentImplRepository = AgentImplRepository;
