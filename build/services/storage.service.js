"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_controller_1 = require("../controllers/storage.controller");
class StorageRoutes {
    router;
    controller;
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new storage_controller_1.StorageController();
        this.routes();
    }
    routes() {
        this.router.route('/storages').get(this.controller.getStorages).post(this.controller.createStorage);
        this.router
            .route('/storages/:id')
            .get(this.controller.getStorage)
            .delete(this.controller.deleteStorage)
            .patch(this.controller.updateStorage);
    }
}
exports.default = new StorageRoutes().router;
