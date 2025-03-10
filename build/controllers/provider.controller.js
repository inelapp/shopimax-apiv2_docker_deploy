"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderController = void 0;
const types_1 = require("../types");
const createProvider_1 = require("../UseCases/provider/createProvider");
const createProviderErrors_1 = require("../UseCases/provider/createProvider/createProviderErrors");
const deleteProvider_1 = require("../UseCases/provider/deleteProvider");
const deleteProviderErrors_1 = require("../UseCases/provider/deleteProvider/deleteProviderErrors");
const getProvider_1 = require("../UseCases/provider/getProvider");
const getProviderErrors_1 = require("../UseCases/provider/getProvider/getProviderErrors");
const getProviders_1 = require("../UseCases/provider/getProviders");
const getProvidersErrors_1 = require("../UseCases/provider/getProviders/getProvidersErrors");
const updateProvider_1 = require("../UseCases/provider/updateProvider");
const updateProviderErrors_1 = require("../UseCases/provider/updateProvider/updateProviderErrors");
const utils_1 = require("../utils");
class ProviderController {
    constructor() {
        this.createProvider = this.createProvider.bind(this);
        this.getProviders = this.getProviders.bind(this);
        this.getProvider = this.getProvider.bind(this);
        this.updateProvider = this.updateProvider.bind(this);
        this.deleteProvider = this.deleteProvider.bind(this);
    }
    async createProvider(req, res) {
        const { name, ruc, phone, addressLine, email, status, referencePhoneNumber, referenceContactName, accountNumber, businessCategory } = req.body;
        const result = await createProvider_1.createProvider.execute({
            name,
            ruc,
            phone,
            addressLine,
            email,
            status,
            referencePhoneNumber,
            referenceContactName,
            accountNumber,
            businessCategory
        });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case createProviderErrors_1.CreateProviderBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.CREATED);
    }
    async getProviders(req, res) {
        const { limit, page, ...filters } = req.body;
        const result = await getProviders_1.getProviders.execute({
            limit: Number(limit) || undefined,
            page: Number(page) || undefined,
            ...filters
        });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case getProvidersErrors_1.GetProvidersBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
    async getProvider(req, res) {
        const { id } = req.params;
        const result = await getProvider_1.getProvider.execute({ id });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case getProviderErrors_1.GetProviderInvalidIdError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case getProviderErrors_1.GetProviderNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
    async updateProvider(req, res) {
        const { id } = req.params;
        const { name, ruc, phone, addressLine, email, status, referencePhoneNumber, referenceContactName, accountNumber, businessCategory } = req.body;
        const result = await updateProvider_1.updateProvider.execute({
            id,
            name,
            ruc,
            phone,
            addressLine,
            email,
            status,
            referencePhoneNumber,
            referenceContactName,
            accountNumber,
            businessCategory
        });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case updateProviderErrors_1.UpdateProviderInvalidIdError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case updateProviderErrors_1.UpdateProviderBadRequestError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case updateProviderErrors_1.UpdateProviderNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
    async deleteProvider(req, res) {
        const { id } = req.params;
        const result = await deleteProvider_1.deleteProvider.execute({ id });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case deleteProviderErrors_1.DeleteProviderInvalidIdError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.BAD_REQUEST, error.constructor.name);
                case deleteProviderErrors_1.DeleteProviderNotFoundError:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.NOT_FOUND, error.constructor.name);
                default:
                    return (0, utils_1.response)(res, error.message, types_1.StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return (0, utils_1.response)(res, result.value, types_1.StatusCode.OK);
    }
}
exports.ProviderController = ProviderController;
