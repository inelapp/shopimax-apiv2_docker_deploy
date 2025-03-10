"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAgents = seedAgents;
const mongo_schema_1 = require("../db/mongo.schema");
const agents_json_1 = __importDefault(require("./data/agents.json"));
async function seedAgents() {
    try {
        const agentsToSave = agents_json_1.default.forEach(async (agent) => {
            const agentById = await mongo_schema_1.agentModel.findById(agent._id);
            if (agentById) {
                return;
            }
            await mongo_schema_1.agentModel.create(agent);
        });
        await Promise.all([agentsToSave]);
        return;
    }
    catch (error) {
        console.log('Error seeding agents', error);
        return;
    }
}
