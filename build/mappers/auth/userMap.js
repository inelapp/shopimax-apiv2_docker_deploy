"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = void 0;
const helpers_1 = require("../../helpers");
class UserMap {
    static fromDbToDomain(userResult) {
        return {
            id: userResult._id,
            username: userResult.username,
            email: userResult.email,
            roles: userResult.roles.map((role) => ({ name: role.name, description: role.description, permissions: role.permissions })),
            status: userResult.status,
            createdAt: (0, helpers_1.parseDate)(userResult.createdAt),
            updatedAt: (0, helpers_1.parseDate)(userResult.updatedAt)
        };
    }
}
exports.UserMap = UserMap;
