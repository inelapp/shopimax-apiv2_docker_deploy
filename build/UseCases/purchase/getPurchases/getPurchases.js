"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const getPurchasesErrors_1 = require("./getPurchasesErrors");
const domain_1 = require("../../../domain");
class GetPurchases {
    purchaseRepository;
    constructor(purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }
    async execute(request, service) {
        try {
            const { page, limit, createdAt, updatedAt, ...purchaseFilters } = request;
            const validateFilters = (0, utils_1.createInstanceOrError)(utils_1.genericFiltersSchema, {
                page,
                limit,
                createdAt,
                updatedAt
            });
            //valida filtros genericos
            if (validateFilters.isErr()) {
                return (0, neverthrow_1.err)(new getPurchasesErrors_1.GetPurchasesBadRequestError(validateFilters.error));
            }
            //valida filtros de purchase
            const validatePurchaseFilters = (0, utils_1.createInstanceOrError)(domain_1.purchaseFiltersSchema, purchaseFilters);
            if (validatePurchaseFilters.isErr()) {
                return (0, neverthrow_1.err)(new getPurchasesErrors_1.GetPurchasesBadRequestError(validatePurchaseFilters.error));
            }
            const result = await this.purchaseRepository.getPurchases(request);
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = GetPurchases;
