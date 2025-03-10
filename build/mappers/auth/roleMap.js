"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMap = void 0;
const helpers_1 = require("../../helpers");
class RoleMap {
    static fromDbToDomain(roleResult) {
        return {
            id: roleResult._id,
            name: roleResult.name,
            description: roleResult.description,
            permissions: roleResult.permissions,
            status: roleResult.status,
            createdAt: (0, helpers_1.parseDate)(roleResult.createdAt),
            updatedAt: (0, helpers_1.parseDate)(roleResult.updated)
        };
    }
}
exports.RoleMap = RoleMap;
