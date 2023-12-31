"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(code, message) {
        super(message);
        this.isApiError = true;
        this.code = code;
        this.message = message;
    }
    static badRequest(msg) {
        return new ApiError(400, msg);
    }
    static unauthorized(msg) {
        return new ApiError(401, msg);
    }
    static internal(msg) {
        return new ApiError(500, msg);
    }
}
exports.default = ApiError;
