"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = require("mongoose");
const env_1 = require("./env");
exports.dbConnection = {
    default: async () => {
        const db = await (0, mongoose_1.connect)(env_1.MONGO_URL);
        console.log(`Database connected: ${db.connection.name}`);
    }
};
