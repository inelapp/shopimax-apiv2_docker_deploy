"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const deletePurchaseErrors_1 = require("./deletePurchaseErrors");
const mongoose_1 = require("mongoose");
class DeletePurchase {
    purchaseRepository;
    constructor(purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }
    async execute(request, service) {
        try {
            const { id } = request;
            if (!(0, mongoose_1.isValidObjectId)(id)) {
                return (0, neverthrow_1.err)(new deletePurchaseErrors_1.DeletePurchaseInvalidIdError());
            }
            const existPurchase = await this.purchaseRepository.getPurchase({ id });
            if (!existPurchase) {
                return (0, neverthrow_1.err)(new deletePurchaseErrors_1.DeletePurchaseNotFoundError());
            }
            const result = await this.purchaseRepository.deltePurchase(id);
            if (!result) {
                return (0, neverthrow_1.err)(new deletePurchaseErrors_1.DeletePurchaseNotFoundError());
            }
            return (0, neverthrow_1.ok)({ message: 'Purchase successfully eliminated' });
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = DeletePurchase;
