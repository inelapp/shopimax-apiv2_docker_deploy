import { Role } from "../../domain/auth";
import { UserDbResponseDetailMap } from "../../mappers";
import { IAuthRepository } from "../user.repository";
import { roleModel } from "../../db/mongo.schema";
import { RoleMap } from "../../mappers/auth/roleMap";

export class AuthImplRepository implements IAuthRepository {
    private readonly roleModel: typeof roleModel;
    constructor(){
        this.roleModel = roleModel;
    }

    async getRoles(): Promise<Role[]> {
        try {
            const roles = await this.roleModel.find().sort({ createdAt: -1 });
            return roles.map(role => RoleMap.fromDbToDomain(role));
        } catch (error) {
            throw error;
        }
    }
    signin(email: string, password: string): Promise<UserDbResponseDetailMap> {
        throw new Error("Method not implemented.");
    }
}