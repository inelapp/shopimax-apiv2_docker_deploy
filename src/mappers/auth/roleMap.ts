import { GenericObject } from "../../types";
import { Role } from "../../domain/auth";
import { parseDate } from "../../helpers";

export class RoleMap {
    static fromDbToDomain(roleResult: GenericObject): Role {
        return {
            id: roleResult._id,
            name: roleResult.name,
            description: roleResult.description,
            permissions: roleResult.permissions,
            status: roleResult.status,
            createdAt: parseDate(roleResult.createdAt),
            updatedAt: parseDate(roleResult.updated)
        };
    }
}