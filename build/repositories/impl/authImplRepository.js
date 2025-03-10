"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthImplRepository = void 0;
const mongo_schema_1 = require("../../db/mongo.schema");
const roleMap_1 = require("../../mappers/auth/roleMap");
class AuthImplRepository {
    roleModel;
    constructor() {
        this.roleModel = mongo_schema_1.roleModel;
    }
    async getRoles() {
        try {
            const roles = await this.roleModel.find().sort({ createdAt: -1 });
            return roles.map(role => roleMap_1.RoleMap.fromDbToDomain(role));
        }
        catch (error) {
            throw error;
        }
    }
    signin(email, password) {
        throw new Error("Method not implemented.");
    }
}
exports.AuthImplRepository = AuthImplRepository;
