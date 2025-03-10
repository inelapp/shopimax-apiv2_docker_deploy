import { UserDbResponseDetailMap } from "../mappers/auth/userMap";
import { IUserProps, Role } from "../domain/auth";

export interface UserFilters {
    id?: string;
    email?: string;
    username?: string;
}

export interface IUserRepository {
    create(user: IUserProps): Promise<UserDbResponseDetailMap>;
    getUser(filters?: UserFilters): Promise<UserDbResponseDetailMap | null>;
}

export interface IAuthRepository {
    getRoles(): Promise<Role[]>
    signin(email: string, password: string): Promise<UserDbResponseDetailMap>;

}