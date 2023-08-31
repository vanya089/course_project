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
const Movie_1 = __importDefault(require("../models/Movie"));
const Movie_2 = __importDefault(require("../models/Movie"));
class MovieController {
    createMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, movieImageUrl } = req.body;
                const newMovie = yield Movie_2.default.create({
                    title,
                    description,
                    movieImageUrl,
                });
                res.status(201).json(newMovie);
            }
            catch (error) {
                res.status(400).json({ error: 'Failed to create movie.' });
            }
        });
    }
    getMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield Movie_1.default.find();
                res.status(200).json(movies);
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while fetching movies.' });
            }
        });
    }
    deleteMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedMovie = yield Movie_1.default.findByIdAndDelete(id);
                if (deletedMovie) {
                    res.status(200).json({ message: 'Movie deleted successfully.' });
                }
                else {
                    res.status(404).json({ error: 'Movie not found.' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while deleting the movie.' });
            }
        });
    }
}
exports.default = new MovieController();
