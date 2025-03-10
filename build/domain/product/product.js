"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const neverthrow_1 = require("neverthrow");
const product_validation_1 = require("./product.validation");
class Product {
    id;
    name;
    price;
    externalProductId;
    sku;
    origin;
    comment;
    registerStatus;
    status;
    constructor(props) {
        Object.assign(this, props);
    }
    static create(props) {
        const { error } = (0, product_validation_1.validateProduct)(props);
        if (error) {
            const productErrors = error.details.map((error) => error.message).join('. ');
            return (0, neverthrow_1.err)(productErrors);
        }
        return (0, neverthrow_1.ok)(new Product(props));
    }
    static partialCreate(props) {
        const { error } = (0, product_validation_1.validatePartialProduct)(props);
        if (error) {
            const productErrors = error.details.map((error) => error.message).join('. ');
            return (0, neverthrow_1.err)(productErrors);
        }
        return (0, neverthrow_1.ok)(new Product(props));
    }
}
exports.Product = Product;
