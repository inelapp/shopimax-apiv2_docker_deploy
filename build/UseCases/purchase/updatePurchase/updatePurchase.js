"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const updatePurchaseErrors_1 = require("./updatePurchaseErrors");
const domain_1 = require("../../../domain");
class UpdatePurchase {
    purchaseRepository;
    providerRepository;
    storageRepository;
    constructor(purchaseRepository, providerRepository, storageRepository) {
        this.purchaseRepository = purchaseRepository;
        this.providerRepository = providerRepository;
        this.storageRepository = storageRepository;
    }
    async execute(request, service) {
        try {
            const { id, ...purchaseData } = request;
            if (!id) {
                return (0, neverthrow_1.err)(new updatePurchaseErrors_1.UpdatePurchaseBadRequestError('The id is missing and must be provided'));
            }
            const instanceOrError = (0, utils_1.createInstanceOrError)(domain_1.updatePurchaseSchema, purchaseData);
            if (instanceOrError.isErr()) {
                return (0, neverthrow_1.err)(new updatePurchaseErrors_1.UpdatePurchaseBadRequestError(instanceOrError.error));
            }
            if (purchaseData.provider) {
                const providerExist = await this.providerRepository.getProvider({ id: purchaseData.provider });
                if (!providerExist) {
                    return (0, neverthrow_1.err)(new updatePurchaseErrors_1.UpdatePurchaseProviderNotFoundError());
                }
            }
            if (purchaseData.storage) {
                const storageExist = await this.storageRepository.getStorage({ id: purchaseData.storage });
                if (!storageExist) {
                    return (0, neverthrow_1.err)(new updatePurchaseErrors_1.UpdatePurchaseStorageNotFoundError());
                }
            }
            const result = await this.purchaseRepository.updatePurchase(id, purchaseData);
            if (!result) {
                return (0, neverthrow_1.err)(new updatePurchaseErrors_1.UpdatePurchaseNotFoundError());
            }
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = UpdatePurchase;
