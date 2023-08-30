import { Request, Response } from 'express';
import Movie from '../models/Movie';
import MovieModel from "../models/Movie";


class MovieController {
    public async createMovie(req: Request, res: Response) {
        try {
            const { title, description, movieImageUrl } = req.body;
            const newMovie = await MovieModel.create({
                title,
                description,
                movieImageUrl,
            });
            res.status(201).json(newMovie);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create movie.' });
        }
    }

    public async getMovies(req: Request, res: Response): Promise<void> {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching movies.' });
        }
    }

    public async deleteMovie(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedMovie = await Movie.findByIdAndDelete(id);
            if (deletedMovie) {
                res.status(200).json({ message: 'Movie deleted successfully.' });
            } else {
                res.status(404).json({ error: 'Movie not found.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while deleting the movie.' });
        }
    }
}

export default new MovieController();
