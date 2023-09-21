"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const express_validator_1 = require("express-validator");
const ApiError_1 = __importDefault(require("../error/ApiError"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Role_1 = __importDefault(require("../models/Role"));
require("dotenv").config();
const generateAccessToken = (id, roles) => {
    const payload = { id, roles };
    return jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
};
exports.generateAccessToken = generateAccessToken;
class UserController {
    createNewUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(new ApiError_1.default(400, 'Fields must not be empty!'));
                }
                const { email, username, password } = req.body;
                const candidate = yield User_1.default.findOne({ email, username });
                if (!candidate) {
                    const userRole = yield Role_1.default.findOne({ value: 'USER' });
                    if (!userRole) {
                        return next(new ApiError_1.default(400, 'Role not found'));
                    }
                    const hashPassword = bcrypt_1.default.hashSync(password, 5);
                    const user = new User_1.default({
                        username,
                        email,
                        password: hashPassword,
                        roles: [userRole.value],
                    });
                    yield user.save();
                    return res.status(200).json({ message: 'Registration successful' });
                }
                else {
                    return next(new ApiError_1.default(400, 'The user is already registered!'));
                }
            }
            catch (e) {
                return res.status(500).json({ error: 'Server error!' });
            }
        });
    }
    loginNewUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield User_1.default.findOne({ email });
                if (!user) {
                    return next(new ApiError_1.default(400, `User ${email} is not found!`));
                }
                const validPassword = bcrypt_1.default.compareSync(password, user.password);
                if (!validPassword) {
                    return next(new ApiError_1.default(400, 'Password error!'));
                }
                const token = (0, exports.generateAccessToken)(user._id, user.roles);
                return res.status(200).json({ token });
            }
            catch (e) {
                return next(new ApiError_1.default(400, 'Login failed!'));
            }
        });
    }
    authCallback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    return res.status(401).json({ message: 'Authentication failed' });
                }
                const token = (0, exports.generateAccessToken)(user._id, user.roles);
                return res.status(200).json({ token });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const user = yield User_1.default.findOne({ email });
                if (!user) {
                    return next(new ApiError_1.default(404, 'User not found'));
                }
                return res.json(user);
            }
            catch (e) {
                return next(new ApiError_1.default(400, 'Server error!'));
            }
        });
    }
}
exports.default = new UserController();
