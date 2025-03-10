"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const neverthrow_1 = require("neverthrow");
const provider_validation_1 = require("./provider.validation");
class Provider {
    id;
    name;
    ruc;
    phone;
    addressLine;
    email;
    status;
    referencePhoneNumber;
    referenceContactName;
    accountNumber;
    businessCategory;
    createdAt;
    updatedAt;
    constructor(props) {
        Object.assign(this, props);
    }
    static create(props) {
        const { error } = (0, provider_validation_1.validateProvider)(props);
        if (error) {
            const providerErrors = error.details.map((error) => error.message).join('. ');
            return (0, neverthrow_1.err)(providerErrors);
        }
        return (0, neverthrow_1.ok)(new Provider(props));
    }
    static partialCreate(props) {
        const { error } = (0, provider_validation_1.validatePartialProvider)(props);
        if (error) {
            const providerErrors = error.details.map((error) => error.message).join('. ');
            return (0, neverthrow_1.err)(providerErrors);
        }
        return (0, neverthrow_1.ok)(new Provider(props));
    }
}
exports.Provider = Provider;
