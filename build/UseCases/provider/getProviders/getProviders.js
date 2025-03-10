"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const getProvidersErrors_1 = require("./getProvidersErrors");
class GetProviders {
    providerRepository;
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }
    async execute(request, service) {
        try {
            const { page, limit, createdAt, updatedAt } = request;
            const validateFilters = (0, utils_1.createInstanceOrError)(utils_1.genericFiltersSchema, {
                page,
                limit,
                createdAt,
                updatedAt
            });
            if (validateFilters.isErr()) {
                return (0, neverthrow_1.err)(new getProvidersErrors_1.GetProvidersBadRequestError(validateFilters.error));
            }
            const result = await this.providerRepository.getProviders(request);
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = GetProviders;
