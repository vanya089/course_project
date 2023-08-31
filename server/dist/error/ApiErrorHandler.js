"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ApiErrorHandler(err, req, res) {
    if (err.isApiError) {
        const apiError = err;
        res.status(apiError.code).json(apiError);
        return;
    }
    res.status(500).send('Server error');
}
exports.default = ApiErrorHandler;
