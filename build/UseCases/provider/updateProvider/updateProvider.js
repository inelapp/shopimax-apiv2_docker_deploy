"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const mongoose_1 = require("mongoose");
const updateProviderErrors_1 = require("./updateProviderErrors");
const domain_1 = require("../../../domain");
class UpdateProvider {
    providerRepository;
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }
    async execute(request, service) {
        try {
            const { id, ...data } = request;
            if (!id) {
                return (0, neverthrow_1.err)(new updateProviderErrors_1.UpdateProviderBadRequestError('The id is missing and must be provided'));
            }
            //Validar id
            if (!(0, mongoose_1.isValidObjectId)(id)) {
                return (0, neverthrow_1.err)(new updateProviderErrors_1.UpdateProviderInvalidIdError());
            }
            //Validar campos
            const instanceOrError = domain_1.Provider.partialCreate(data);
            if (instanceOrError.isErr()) {
                return (0, neverthrow_1.err)(new updateProviderErrors_1.UpdateProviderBadRequestError(instanceOrError.error));
            }
            //Validar si exite provider
            const existProvider = await this.providerRepository.getProvider({ id });
            if (!existProvider) {
                return (0, neverthrow_1.err)(new updateProviderErrors_1.UpdateProviderNotFoundError());
            }
            //validar si ruc esta registrado
            if (request.ruc) {
                const isRucRegistered = await this.providerRepository.getProvider({ ruc: request.ruc });
                if (isRucRegistered) {
                    return (0, neverthrow_1.err)(new updateProviderErrors_1.UpdateProviderBadRequestError('Provider with same RUC already exists'));
                }
            }
            const result = await this.providerRepository.updateProvider(id, instanceOrError.value);
            if (!result) {
                return (0, neverthrow_1.err)(new updateProviderErrors_1.UpdateProviderNotFoundError());
            }
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = UpdateProvider;
