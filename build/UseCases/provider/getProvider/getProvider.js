"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const mongoose_1 = require("mongoose");
const getProviderErrors_1 = require("./getProviderErrors");
class GetProvider {
    providerRepository;
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }
    async execute(request, service) {
        try {
            const { id } = request;
            if (!(0, mongoose_1.isValidObjectId)(id)) {
                return (0, neverthrow_1.err)(new getProviderErrors_1.GetProviderInvalidIdError());
            }
            const result = await this.providerRepository.getProvider(request);
            if (!result) {
                return (0, neverthrow_1.err)(new getProviderErrors_1.GetProviderNotFoundError());
            }
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = GetProvider;
