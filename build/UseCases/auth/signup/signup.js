"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const signupErrors_1 = require("./signupErrors");
const utils_1 = require("../../../utils");
const auth_1 = require("../../../domain/auth");
class Signup {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(request, service) {
        try {
            const userOrError = auth_1.User.create(request);
            if (userOrError.isErr()) {
                return (0, neverthrow_1.err)(new signupErrors_1.SignupBadRequestError(userOrError.error));
            }
            const user = userOrError.value;
            const userByEmail = await this.userRepository.getUser({ email: user.email });
            if (userByEmail) {
                return (0, neverthrow_1.err)(new signupErrors_1.SignupUserEmailAlreadyExistsError());
            }
            const userByUsername = await this.userRepository.getUser({ username: user.username });
            if (userByUsername) {
                return (0, neverthrow_1.err)(new signupErrors_1.SignupUserUsernameAlreadyExistsError());
            }
            return (0, neverthrow_1.ok)(await this.userRepository.create(user));
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error.message));
        }
    }
}
exports.default = Signup;
