import { Request, Response } from 'express';
import ApiError from '../error/ApiError';

function ApiErrorHandler(err: Error, req: Request, res: Response) {
    if ((err as ApiError).isApiError) {
        const apiError = err as ApiError;
        res.status(apiError.code).json(apiError);
        return;
    }

    res.status(500).send('Server error');
}

export default ApiErrorHandler;
