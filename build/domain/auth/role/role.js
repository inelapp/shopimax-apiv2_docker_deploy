"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
class Role {
    id;
    name;
    description;
    status;
    permissions;
    createdAt;
    updatedAt;
    constructor(props) {
        Object.assign(this, props);
    }
    static create(props) {
        return new Role(props);
    }
}
exports.Role = Role;
