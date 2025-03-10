"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const utils_1 = require("./utils");
const mongoose_1 = require("mongoose");
const product_service_1 = __importDefault(require("./services/product.service"));
const order_service_1 = __importDefault(require("./services/order.service"));
const agent_service_1 = __importDefault(require("./services/agent.service"));
const provider_service_1 = __importDefault(require("./services/provider.service"));
const storage_service_1 = __importDefault(require("./services/storage.service"));
const purchase_service_1 = __importDefault(require("./services/purchase.service"));
const auth_service_1 = __importDefault(require("./services/auth/auth.service"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_doc_1 = __importDefault(require("./utils/docs/v1/swagger-doc"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('combined'));
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));
app.get('/', (req, res) => {
    const db = mongoose_1.connection.readyState === 1 ? 'connected' : 'disconnected';
    return (0, utils_1.response)(res, {
        message: 'Welcome to the API',
        status: 'success',
        database: db
    }, 200);
});
app.use('/favicon.ico', (req, res) => res.status(204).end());
app.use('/api/v1', order_service_1.default, product_service_1.default, agent_service_1.default, provider_service_1.default, storage_service_1.default, purchase_service_1.default, auth_service_1.default);
app.use('/api/v1/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_doc_1.default));
exports.default = app;
