import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import ApiError from '../error/ApiError';

cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinaryV2,
    params: async (req, file) => {
        return {
            folder: 'uploads',
        };
    },
});

const upload = multer({ storage: cloudinaryStorage });

export const uploadMovieImage = upload.single('image');

export const processMovieImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return next(ApiError.badRequest('No image file provided.'));
        }

        const imageResult = await cloudinaryV2.uploader.upload(req.file.path);

        req.body.movieImageUrl = imageResult.secure_url;
        next();
    } catch (error) {
        next(ApiError.internal('Image processing failed.'));
    }
};
