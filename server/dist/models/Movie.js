"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MovieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    movieImageUrl: { type: String, required: true },
});
const Movie = (0, mongoose_1.model)('Movie', MovieSchema);
exports.default = Movie;
