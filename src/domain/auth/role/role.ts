import { DataStatus } from "../../../types";

export interface IRoleProps {
    id?: string;
    name: string;
    description: string;
    permissions: Array<string>;
}

export class Role {
    id: string;
    name: string;
    description?: string;
    status: string | DataStatus;
    permissions: Array<string>;
    createdAt: Date;
    updatedAt: Date;

    constructor(props: IRoleProps) {
        Object.assign(this, props);
    }

    static create(props: IRoleProps): Role {
        return new Role(props);
    }
}