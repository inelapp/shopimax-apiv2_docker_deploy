"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const mongoose_1 = require("mongoose");
const deleteProviderErrors_1 = require("./deleteProviderErrors");
class DeleteProvider {
    providerRepository;
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }
    async execute(request, service) {
        try {
            const { id } = request;
            if (!(0, mongoose_1.isValidObjectId)(id)) {
                return (0, neverthrow_1.err)(new deleteProviderErrors_1.DeleteProviderInvalidIdError());
            }
            const providerExist = await this.providerRepository.getProvider({ id });
            if (!providerExist) {
                return (0, neverthrow_1.err)(new deleteProviderErrors_1.DeleteProviderNotFoundError());
            }
            const result = await this.providerRepository.deleteProvider(id);
            if (!result) {
                return (0, neverthrow_1.err)(new deleteProviderErrors_1.DeleteProviderNotFoundError());
            }
            return (0, neverthrow_1.ok)({ message: 'Provider successfully eliminated' });
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = DeleteProvider;
