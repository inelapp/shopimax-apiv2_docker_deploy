import { Schema } from "mongoose";

export interface IRoleDb {
    _id: string | Schema.Types.ObjectId;
    name: string;
    description?: string;
    status: string;
    permissions: Array<string>;
    createdAt: Date;
    updatedAt: Date;
}