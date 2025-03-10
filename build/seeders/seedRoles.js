"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoles = seedRoles;
const mongo_schema_1 = require("../db/mongo.schema");
const roles_json_1 = __importDefault(require("./data/roles.json"));
async function seedRoles() {
    try {
        const rolesToSave = roles_json_1.default.forEach(async (role) => {
            const roleById = await mongo_schema_1.roleModel.findById(role._id);
            if (roleById) {
                return;
            }
            await mongo_schema_1.roleModel.create(role);
        });
        await Promise.all([rolesToSave]);
        return;
    }
    catch (error) {
        console.log('Error seeding roles', error);
        return;
    }
}
