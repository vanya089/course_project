import jwt, {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import ApiError from '../error/ApiError';
import {IUser} from "../models/User";

declare module 'express-serve-static-core' {
    interface Request {
        user?: IUser;
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) {
        return next(ApiError.unauthorized('Access denied. Token missing.'));
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET!) as IUser;
        next();
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json(ApiError.unauthorized('Invalid token.'));
        }
        if (error instanceof TokenExpiredError) {
            return res.status(401).json(ApiError.unauthorized('Token has expired.'));
        }
        res.status(500).json(ApiError.internal('An error occurred.'));
    }
};