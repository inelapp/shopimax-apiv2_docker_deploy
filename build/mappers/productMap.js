"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMap = void 0;
class ProductMap {
    static toDbFromDomain(productDb) {
        return {
            id: productDb._id,
            name: productDb.name,
            price: productDb.price,
            sku: productDb.sku,
            origin: productDb.origin,
            externalProductId: productDb.externalProductId,
            registerStatus: productDb.registerStatus,
            status: productDb.status,
            comment: productDb.comment
        };
    }
}
exports.ProductMap = ProductMap;
