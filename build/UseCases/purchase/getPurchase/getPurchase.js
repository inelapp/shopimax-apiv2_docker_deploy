"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const utils_1 = require("../../../utils");
const mongoose_1 = require("mongoose");
const getPurchaseErrors_1 = require("./getPurchaseErrors");
class GetPurchase {
    purchaseRepository;
    constructor(purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }
    async execute(request, service) {
        try {
            const { id } = request;
            if (!(0, mongoose_1.isValidObjectId)(id)) {
                return (0, neverthrow_1.err)(new getPurchaseErrors_1.GetPurchaseInvalidIdError());
            }
            const result = await this.purchaseRepository.getPurchase({ id });
            if (!result) {
                return (0, neverthrow_1.err)(new getPurchaseErrors_1.GetPurchaseNotFoundError());
            }
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
}
exports.default = GetPurchase;
