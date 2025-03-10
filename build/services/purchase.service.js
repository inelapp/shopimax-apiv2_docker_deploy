"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
class PurchaseRoutes {
    router;
    constroller;
    constructor() {
        this.router = (0, express_1.Router)();
        this.constroller = new controllers_1.PurchaseController();
        this.routes();
    }
    routes() {
        this.router
            .route('/purchases')
            .post(this.constroller.createPurchase)
            .get(this.constroller.getPurchases)
            .put(this.constroller.updatePurchase);
        this.router.route('/purchases/:id').get(this.constroller.getPurchase).delete(this.constroller.deletePurchase);
    }
}
exports.default = new PurchaseRoutes().router;
