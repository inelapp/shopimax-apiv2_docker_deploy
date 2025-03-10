"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetail = void 0;
const neverthrow_1 = require("neverthrow");
const order_validation_1 = require("./order.validation");
class OrderDetail {
    id;
    origin;
    order;
    product;
    customProduct;
    quantity;
    review;
    constructor(props) {
        Object.assign(this, props);
    }
    static create(props) {
        const { error } = (0, order_validation_1.validateOrderDetail)(props);
        if (error) {
            const orderDetailErrors = error.details.map((error) => error.message).join('. ');
            return (0, neverthrow_1.err)(orderDetailErrors);
        }
        return (0, neverthrow_1.ok)(new OrderDetail(props));
    }
}
exports.OrderDetail = OrderDetail;
