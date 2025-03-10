"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const provider_controller_1 = require("../controllers/provider.controller");
class ProviderRoutes {
    router;
    controller;
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new provider_controller_1.ProviderController();
        this.routes();
    }
    routes() {
        this.router.route('/providers').post(this.controller.createProvider).get(this.controller.getProviders);
        this.router
            .route('/providers/:id')
            .get(this.controller.getProvider)
            .delete(this.controller.deleteProvider)
            .patch(this.controller.updateProvider);
    }
}
exports.default = new ProviderRoutes().router;
