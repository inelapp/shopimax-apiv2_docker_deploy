import { Schema } from "mongoose";


export interface IUserDb {
    _id: string | Schema.Types.ObjectId;
    username?: string;
    email: string;
    password: string;
    roles: Array<string | Schema.Types.ObjectId>;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}