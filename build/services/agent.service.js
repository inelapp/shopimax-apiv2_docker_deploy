"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
class AgentRoutes {
    router;
    controller;
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new controllers_1.AgentController();
        this.routes();
    }
    routes() {
        this.router.route('/agents').get(this.controller.getAgents).post(this.controller.createAgent);
        this.router.route('/agents/:id').get(this.controller.getAgent).patch(this.controller.updateAgent);
    }
}
exports.default = new AgentRoutes().router;
