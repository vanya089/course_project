import {Request, Response} from 'express';
import Review from '../models/Review';


class ReviewController {
    public async createReview(req: Request, res: Response) {
        try {
            const {title, description, year, genre, imageUrl} = req.body;
            let userId = req.user;
            const newReview = await Review.create({
                userId,
                title,
                year,
                genre,
                description,
                imageUrl,
            });
            res.status(201).json(newReview);
        } catch (error) {
            res.status(400).json({error: 'Failed to create movie.'});
        }
    }

    public async getReviews(req: Request, res: Response): Promise<void> {
        try {
            const movies = await Review.find();
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({error: 'An error occurred while fetching movies.'});
        }
    }

    public async deleteReview(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            const deletedMovie = await Review.findByIdAndDelete(id);
            if (deletedMovie) {
                res.status(200).json({message: 'Review deleted successfully.'});
            } else {
                res.status(404).json({error: 'Review not found.'});
            }
        } catch (error) {
            res.status(500).json({error: 'An error occurred while deleting the movie.'});
        }
    }
}

export default new ReviewController();
