"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
class UserRoutes {
    router;
    controller;
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new controllers_1.AuthController();
        this.routes();
    }
    routes() {
        this.router.post('/auth/signup', this.controller.signup);
        this.router.get('/auth/roles', this.controller.getRoles);
    }
}
exports.default = new UserRoutes().router;
