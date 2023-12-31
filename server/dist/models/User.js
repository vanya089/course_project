"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }],
    // twitterId: { type: String, unique: true },
    // googleId: { type: String, unique: true },
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
