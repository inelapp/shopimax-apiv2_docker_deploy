"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseMap = void 0;
class PurchaseMap {
    static toDomainFromDb(purchaseDb) {
        return {
            id: purchaseDb._id,
            products: purchaseDb.products.map((product) => {
                return {
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    boxes: product.boxes,
                    sku: product.sku
                };
            }),
            referencePurchaseNumber: purchaseDb.referencePurchaseNumber,
            provider: purchaseDb.provider,
            storage: purchaseDb.storage,
            confirmed: purchaseDb.confirmed,
            subTotal: purchaseDb.subTotal,
            total: purchaseDb.total,
            discount: purchaseDb.discount,
            observation: purchaseDb.observation,
            currency: purchaseDb.currency,
            paymentType: purchaseDb.paymentType,
            conditionPayment: purchaseDb.conditionPayment,
            paymentReference: purchaseDb.paymentReference,
            numberOfBoxes: purchaseDb.numberOfBoxes,
            active: purchaseDb.active
        };
    }
}
exports.PurchaseMap = PurchaseMap;
