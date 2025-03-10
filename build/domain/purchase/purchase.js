"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const neverthrow_1 = require("neverthrow");
const purchase_validation_1 = require("./purchase.validation");
class Purchase {
    id;
    products;
    referencePurchaseNumber;
    provider;
    storage;
    confirmed;
    subTotal;
    total;
    discount;
    observation;
    currency;
    paymentType;
    conditionPayment;
    paymentReference;
    numberOfBoxes;
    active;
    constructor(props) {
        Object.assign(this, props);
    }
    static create(props) {
        const { error } = (0, purchase_validation_1.validatePurchase)(props);
        if (error) {
            const purchaseErrors = error.details.map((error) => error.message).join('. ');
            return (0, neverthrow_1.err)(purchaseErrors);
        }
        return (0, neverthrow_1.ok)(new Purchase(props));
    }
}
exports.Purchase = Purchase;
