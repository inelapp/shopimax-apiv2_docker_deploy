"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const domain_1 = require("../../../domain");
const createPurchaseErrors_1 = require("./createPurchaseErrors");
class CreatePuchase {
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
            const instanceOrError = domain_1.Purchase.create(request);
            if (instanceOrError.isErr()) {
                return (0, neverthrow_1.err)(new createPurchaseErrors_1.CreatePurchaseBadRequestError(instanceOrError.error));
            }
            //Validamos provider
            const existProvider = await this.providerRepository.getProvider({ id: request.provider });
            if (!existProvider) {
                return (0, neverthrow_1.err)(new createPurchaseErrors_1.CreatePurchaseProviderNotfoundError());
            }
            //Validamos storage
            const existStorage = await this.storageRepository.getStorage({ id: request.storage });
            if (!existStorage) {
                return (0, neverthrow_1.err)(new createPurchaseErrors_1.CreatePurchaseStorageNotfoundError());
            }
            const result = await this.purchaseRepository.createPurchase(instanceOrError.value);
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = CreatePuchase;
