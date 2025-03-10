"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const signup_1 = require("../../UseCases/auth/signup");
const utils_1 = require("../../utils");
const signupErrors_1 = require("../../UseCases/auth/signup/signupErrors");
const types_1 = require("../../types");
const getRoles_1 = require("../../UseCases/auth/getRoles");
class AuthController {
    constructor() {
        this.signup = this.signup.bind(this);
        this.getRoles = this.getRoles.bind(this);
    }
    async getRoles(req, res) {
        const result = await getRoles_1.getRoles.execute({});
        if (result.isErr()) {
            const error = result.error;
            return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
        }
        return (0, utils_1.response)(res, result.value, 200);
    }
    async signup(req, res) {
        const { email, password, roles, username } = req.body;
        const result = await signup_1.signup.execute({ email, password, roles, username });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case signupErrors_1.SignupBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, 201);
    }
}
exports.AuthController = AuthController;
