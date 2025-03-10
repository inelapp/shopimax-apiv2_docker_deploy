"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseController = void 0;
const types_1 = require("../types");
const createPurchase_1 = require("../UseCases/purchase/createPurchase");
const createPurchaseErrors_1 = require("../UseCases/purchase/createPurchase/createPurchaseErrors");
const deletePurchase_1 = require("../UseCases/purchase/deletePurchase");
const deletePurchaseErrors_1 = require("../UseCases/purchase/deletePurchase/deletePurchaseErrors");
const getPurchase_1 = require("../UseCases/purchase/getPurchase");
const getPurchaseErrors_1 = require("../UseCases/purchase/getPurchase/getPurchaseErrors");
const getPurchases_1 = require("../UseCases/purchase/getPurchases");
const getPurchasesErrors_1 = require("../UseCases/purchase/getPurchases/getPurchasesErrors");
const updatePurchase_1 = require("../UseCases/purchase/updatePurchase");
const updatePurchaseErrors_1 = require("../UseCases/purchase/updatePurchase/updatePurchaseErrors");
const utils_1 = require("../utils");
class PurchaseController {
    constructor() {
        this.createPurchase = this.createPurchase.bind(this);
    }
    async createPurchase(req, res) {
        const payload = req.body;
        const result = await createPurchase_1.createPurchase.execute(payload);
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case createPurchaseErrors_1.CreatePurchaseBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case createPurchaseErrors_1.CreatePurchaseProviderNotfoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                case createPurchaseErrors_1.CreatePurchaseStorageNotfoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.CREATED);
    }
    async getPurchase(req, res) {
        const { id } = req.params;
        const result = await getPurchase_1.getPurchase.execute({ id });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case getPurchaseErrors_1.GetPurchaseInvalidIdError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case getPurchaseErrors_1.GetPurchaseNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
    async getPurchases(req, res) {
        const { limit, page, ...filters } = req.body;
        const result = await getPurchases_1.getPurchases.execute({
            limit: Number(limit) || undefined,
            page: Number(page) || undefined,
            ...filters
        });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case getPurchasesErrors_1.GetPurchasesBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
    async updatePurchase(req, res) {
        const data = req.body;
        const result = await updatePurchase_1.updatePurchase.execute(data);
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case updatePurchaseErrors_1.UpdatePurchaseBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case updatePurchaseErrors_1.UpdatePurchaseInvalidIdError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case updatePurchaseErrors_1.UpdatePurchaseNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                case updatePurchaseErrors_1.UpdatePurchaseProviderNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                case updatePurchaseErrors_1.UpdatePurchaseStorageNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
    async deletePurchase(req, res) {
        const { id } = req.params;
        const result = await deletePurchase_1.deletePurchase.execute({ id });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case deletePurchaseErrors_1.DeletePurchaseInvalidIdError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case deletePurchaseErrors_1.DeletePurchaseNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
}
exports.PurchaseController = PurchaseController;
