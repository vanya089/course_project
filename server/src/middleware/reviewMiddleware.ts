import {NextFunction, Request, Response} from 'express';
import cloudinary from 'cloudinary';
import ApiError from '../error/ApiError';
import streamifier from 'streamifier';


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const processMovieImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return next(ApiError.badRequest('No image file provided.'));
        }

        const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
            if (error) {
                return next(ApiError.internal('Image processing failed.'));
            }

            if (!result) {
                return next(ApiError.internal('Result not found.'));
            }
            req.body.imageUrl = result.secure_url;
            next();
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
    } catch (error) {
        next(ApiError.internal('Image processing failed.'));
    }
};
