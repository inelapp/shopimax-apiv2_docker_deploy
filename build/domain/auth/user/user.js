"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const neverthrow_1 = require("neverthrow");
const user_validation_1 = require("./user.validation");
class User {
    id;
    username;
    email;
    password;
    roles;
    status;
    createdAt;
    updatedAt;
    constructor(props) {
        Object.assign(this, props);
    }
    static create(props) {
        const { error } = (0, user_validation_1.userValidationSchema)(props);
        if (error) {
            const userErrors = error.details.map((error) => error.message).join('. ');
            return (0, neverthrow_1.err)(userErrors);
        }
        return (0, neverthrow_1.ok)(new User(props));
    }
}
exports.User = User;
