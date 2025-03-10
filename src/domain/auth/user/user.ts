import { err, ok, Result } from "neverthrow";
import { DataStatus } from "../../../types";
import { userValidationSchema } from "./user.validation";

export interface IUserProps {
    username?: string;
    email: string;
    password: string;
    roles?: Array<string>;
    status?: string | DataStatus;
}

export class User {
    id: string;
    username?: string;
    email: string;
    password: string;
    roles: Array<string>;
    status: string | DataStatus;
    createdAt: Date;
    updatedAt: Date;

    constructor(props: IUserProps) {
        Object.assign(this, props);
    }

    static create(props: IUserProps): Result<User, string> {
        const { error } = userValidationSchema(props);
        if(error) {
            const userErrors = error.details.map((error) => error.message).join('. ');
            return err(userErrors);
        }
        return ok(new User(props));
    }
}