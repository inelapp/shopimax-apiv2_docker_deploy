"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const seeders_1 = require("./seeders");
(async () => {
    app_1.default.listen(config_1.PORT, () => {
        console.log(`Server is running on port ${config_1.PORT}`);
    });
    await config_1.dbConnection.default();
    await Promise.all([(0, seeders_1.seedAgents)(), (0, seeders_1.seedRoles)()]);
})();
