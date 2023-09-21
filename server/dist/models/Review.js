"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    //userId: {type: String, required: true},
    title: { type: String, required: true, text: true, },
    description: { type: String, required: true, text: true, },
    year: { type: String, required: true, text: true, },
    genre: { type: String, required: true, text: true, },
    imageUrl: { type: String, required: true },
});
const Review = (0, mongoose_1.model)('Review', ReviewSchema);
exports.default = Review;
