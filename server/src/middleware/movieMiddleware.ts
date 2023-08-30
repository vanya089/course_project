import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import cloudinary from "../cloudinaryConfig";
import ApiError from "../error/ApiError";


const upload = multer({ dest: 'uploads/' });

export const uploadMovieImage = upload.single('image');

export const processMovieImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return next(ApiError.badRequest('No image file provided.'));
        }

        const imageResult = await cloudinary.v2.uploader.upload(req.file.path);
        req.body.movieImageUrl = imageResult.secure_url;
        next();
    } catch (error) {
        next(ApiError.internal('Image processing failed.'));
    }
};
