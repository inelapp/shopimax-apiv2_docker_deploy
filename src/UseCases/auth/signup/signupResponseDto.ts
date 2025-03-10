import { DataStatus } from "../../../types";

export interface SignupResponseDto {
    id: string;
    username?: string;
    email: string;
    roles: Array<{ name?: string, description?: string, permissions?: Array<string> }>;
    status: string | DataStatus;
    createdAt: Date;
    updatedAt: Date;
}