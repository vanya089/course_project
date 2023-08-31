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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose = require('mongoose').default;
require("dotenv").config();
const router = require("./router");
const ApiErrorHandler_1 = __importDefault(require("./error/ApiErrorHandler"));
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", router);
app.use(ApiErrorHandler_1.default);
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.set("strictQuery", false);
            yield mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, });
            app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT));
        }
        catch (e) {
            console.log(e);
        }
    });
}
startApp();
