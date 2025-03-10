"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderMap = void 0;
const helpers_1 = require("../helpers");
class ProviderMap {
    static toDomainFromDb(providerDb) {
        return {
            id: providerDb._id,
            name: providerDb.name,
            ruc: providerDb.ruc,
            phone: providerDb.phone,
            addressLine: providerDb.addressLine,
            email: providerDb.email,
            status: providerDb.status,
            referencePhoneNumber: providerDb.referencePhoneNumber,
            referenceContactName: providerDb.referenceContactName,
            accountNumber: providerDb.accountNumber,
            businessCategory: providerDb.businessCategory,
            createdAt: (0, helpers_1.parseDate)(providerDb.createdAt),
            updatedAt: (0, helpers_1.parseDate)(providerDb.updatedAt)
        };
    }
}
exports.ProviderMap = ProviderMap;
