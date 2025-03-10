"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
class ProductRoutes {
    router;
    controller;
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new controllers_1.ProductController();
        this.routes();
    }
    routes() {
        this.router
            .route('/products')
            .post(this.controller.createProduct)
            .get(this.controller.getProducts)
            .put(this.controller.updateProduct);
        this.router.get('/products/:id', this.controller.getProduct);
    }
}
exports.default = new ProductRoutes().router;
