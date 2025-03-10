"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const neverthrow_1 = require("neverthrow");
class GetRoles {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(request, service) {
        try {
            return (0, neverthrow_1.ok)(await this.authRepository.getRoles());
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error.message));
        }
    }
}
exports.default = GetRoles;
