import jwt, {JsonWebTokenError, JwtPayload, TokenExpiredError} from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import ApiError from '../error/ApiError';
import {IUser} from "../models/User";
require("dotenv").config();

declare module 'express-serve-static-core' {
    interface Request {
        user?: IUser;
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(403).json({message: "Not logged in!"})
        }

        if (!process.env.SECRET_KEY) {
            return next(new ApiError(403, 'SECRET_KEY is not set in the environment.'));
        }

        const decodedData: JwtPayload = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;
        req.user = { _id: decodedData.userId } as IUser;
        next();
    } catch (error) {
        return next(error);
    }
};