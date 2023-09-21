import {NextFunction, Request, Response} from 'express';
import Review from '../models/Review';
import ApiError from "../error/ApiError";


class ReviewController {
    public async createReview(req: Request, res: Response, next: NextFunction) {
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
            return next(new ApiError(400, 'Failed to create movie.'));
        }
    }

    public async getReviews(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const review = await Review.find();
            res.status(200).json(review);
        } catch (error) {
            return next(new ApiError(500, 'An error occurred while fetching reviews.'));
        }
    }

    public async deleteReview(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {_id} = req.params;
            const deletedMovie = await Review.findByIdAndDelete(_id);
            if (deletedMovie) {
                res.status(200).json({message: 'Review deleted successfully.'});
            } else {
                return next(new ApiError(404, 'Review not found!'));
            }
        } catch (error) {
            return next(new ApiError(500, 'An error occurred while deleting the review.'));
        }
    }
}

export default new ReviewController();
