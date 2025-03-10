"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const neverthrow_1 = require("neverthrow");
const order_validation_1 = require("./order.validation");
class Order {
    id;
    orderNumber;
    storeName;
    agency;
    agent;
    client;
    agencyCost;
    advancePayment;
    pendingPayment;
    subTotal;
    discount;
    total;
    orderDetail;
    deliveryType;
    paymentMethod;
    observation;
    contactedStatus;
    registerStatus;
    status;
    comment;
    creationDate;
    updateDate;
    origin;
    constructor(props) {
        Object.assign(this, props);
    }
    static create(props) {
        const { error } = (0, order_validation_1.validateOrder)(props);
        if (error) {
            const orderErrors = error.details.map((error) => error.message).join('. ');
            return (0, neverthrow_1.err)(orderErrors);
        }
        return (0, neverthrow_1.ok)(new Order(props));
    }
}
exports.Order = Order;
