"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const neverthrow_1 = require("neverthrow");
const domain_1 = require("../../../domain");
const createProviderErrors_1 = require("./createProviderErrors");
class CreateProvider {
    providerRepository;
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }
    async execute(request, service) {
        try {
            const providerOrError = domain_1.Provider.create(request);
            if (providerOrError.isErr()) {
                return (0, neverthrow_1.err)(new createProviderErrors_1.CreateProviderBadRequestError(providerOrError.error));
            }
            const provider = providerOrError.value;
            //validar si existe ruc
            const isRucRegistered = await this.providerRepository.getProvider({ ruc: request.ruc });
            if (isRucRegistered) {
                return (0, neverthrow_1.err)(new createProviderErrors_1.CreateProviderBadRequestError('Provider with same RUC already exists'));
            }
            const result = await this.providerRepository.createProvider(provider);
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = CreateProvider;
