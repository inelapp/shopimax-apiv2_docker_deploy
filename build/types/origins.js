"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.Roles = exports.DataStatus = exports.OriginData = void 0;
var OriginData;
(function (OriginData) {
    OriginData["MANUAL"] = "manual";
    OriginData["ONLINE"] = "online";
    OriginData["UNDEFINED"] = "undefined";
})(OriginData || (exports.OriginData = OriginData = {}));
var DataStatus;
(function (DataStatus) {
    DataStatus["INVALID"] = "invalid";
    DataStatus["VALID"] = "valid";
    DataStatus["PENDING"] = "pending";
    DataStatus["ACTIVE"] = "active";
    DataStatus["INACTIVE"] = "inactive";
})(DataStatus || (exports.DataStatus = DataStatus = {}));
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "admin";
    Roles["AGENT"] = "asesor";
})(Roles || (exports.Roles = Roles = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pendiente";
    OrderStatus["NEW"] = "nuevo";
    OrderStatus["DELIVERED"] = "entregado";
    OrderStatus["TRACKING"] = "seguimiento";
    OrderStatus["DOWNGRADE"] = "caida";
    OrderStatus["TRANSIT"] = "transito";
    OrderStatus["ARRIVED_MISSING_PAYMENT"] = "llego fp";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
