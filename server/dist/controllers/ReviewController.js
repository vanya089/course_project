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
const Review_1 = __importDefault(require("../models/Review"));
const ApiError_1 = __importDefault(require("../error/ApiError"));
class ReviewController {
    createReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, year, genre, imageUrl } = req.body;
                //let userId = req.user;
                const newReview = yield Review_1.default.create({
                    //    userId,
                    title,
                    year,
                    genre,
                    description,
                    imageUrl,
                });
                res.status(201).json(newReview);
            }
            catch (error) {
                return next(new ApiError_1.default(400, 'Failed to create movie.'));
            }
        });
    }
    getReviews(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield Review_1.default.find();
                res.status(200).json(review);
            }
            catch (error) {
                return next(new ApiError_1.default(500, 'An error occurred while fetching reviews.'));
            }
        });
    }
    searchReviews(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query } = req.query;
                console.log(query);
                const results = yield Review_1.default.find({
                    $text: { $search: query },
                });
                res.json(results);
            }
            catch (error) {
                return next(new ApiError_1.default(400, 'Search error'));
            }
        });
    }
    ;
    deleteReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const deletedMovie = yield Review_1.default.findByIdAndDelete(_id);
                if (deletedMovie) {
                    res.status(200).json({ message: 'Review deleted successfully.' });
                }
                else {
                    return next(new ApiError_1.default(404, 'Review not found!'));
                }
            }
            catch (error) {
                return next(new ApiError_1.default(500, 'An error occurred while deleting the review.'));
            }
        });
    }
}
exports.default = new ReviewController();
