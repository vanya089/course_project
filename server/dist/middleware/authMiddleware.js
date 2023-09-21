"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../error/ApiError"));
require("dotenv").config();
const authenticateToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "Not logged in!" });
        }
        if (!process.env.SECRET_KEY) {
            return next(new ApiError_1.default(403, 'SECRET_KEY is not set in the environment.'));
        }
        const decodedData = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.user = { _id: decodedData.userId };
        next();
    }
    catch (error) {
        return next(error);
    }
};
exports.authenticateToken = authenticateToken;
