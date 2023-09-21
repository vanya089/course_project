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
exports.processMovieImage = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const ApiError_1 = __importDefault(require("../error/ApiError"));
const streamifier_1 = __importDefault(require("streamifier"));
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const processMovieImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return next(ApiError_1.default.badRequest('No image file provided.'));
        }
        const stream = cloudinary_1.default.v2.uploader.upload_stream((error, result) => {
            if (error) {
                return next(ApiError_1.default.internal('Image processing failed.'));
            }
            if (!result) {
                return next(ApiError_1.default.internal('Result not found.'));
            }
            req.body.imageUrl = result.secure_url;
            next();
        });
        streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
    }
    catch (error) {
        next(ApiError_1.default.internal('Image processing failed.'));
    }
});
exports.processMovieImage = processMovieImage;
