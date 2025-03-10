import { IRoleDb, IUserDb } from "../../db/interfaces";
import { parseDate } from "../../helpers";

export type IUserDbDetails = Omit<IUserDb, "roles"> & { roles: Array<Partial<IRoleDb>> };

export interface UserDbResponseDetailMap {
    id: string;
    username?: string;
    email: string;
    roles: Array<Partial<IRoleDb>>;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export class UserMap {
    static fromDbToDomain(userResult: IUserDbDetails): UserDbResponseDetailMap {
        return {
            id: userResult._id as string,
            username: userResult.username,
            email: userResult.email,
            roles: userResult.roles.map((role) => ({ name: role.name, description: role.description, permissions: role.permissions })),
            status: userResult.status,
            createdAt: parseDate(userResult.createdAt),
            updatedAt: parseDate(userResult.updatedAt)
        }
    }
}