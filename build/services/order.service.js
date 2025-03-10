"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
class OrderRoutes {
    router;
    controller;
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new order_controller_1.OrderController();
        this.routes();
    }
    routes() {
        this.router.post('/orders/process-orders', this.controller.processOrderWebhook);
        this.router.route('/orders/:id').get(this.controller.getOrder).patch(this.controller.updateOrder);
        this.router.route('/orders').get(this.controller.getOrders).post(this.controller.createOrder);
    }
}
exports.default = new OrderRoutes().router;
