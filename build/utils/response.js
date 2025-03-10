"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = response;
function response(res, data, status, type) {
    res.status(status).json({
        success: true ? status < 400 : false,
        result: status < 400 ? data : undefined,
        error: status >= 400 ? data : undefined,
        statusCode: status >= 400 ? status : undefined,
        type: status >= 400 ? type : undefined
    });
}
