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
exports.processMovieImage = exports.uploadMovieImage = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinaryConfig_1 = __importDefault(require("../cloudinaryConfig"));
const ApiError_1 = __importDefault(require("../error/ApiError"));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
exports.uploadMovieImage = upload.single('image');
const processMovieImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return next(ApiError_1.default.badRequest('No image file provided.'));
        }
        const imageResult = yield cloudinaryConfig_1.default.v2.uploader.upload(req.file.path);
        req.body.movieImageUrl = imageResult.secure_url;
        next();
    }
    catch (error) {
        next(ApiError_1.default.internal('Image processing failed.'));
    }
});
exports.processMovieImage = processMovieImage;
