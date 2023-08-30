export default class ApiError extends Error {
    code: number;
    message: string;
    isApiError: boolean = true;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
        this.message = message;
    }

    static badRequest(msg: string): ApiError {
        return new ApiError(400, msg);
    }

    static unauthorized(msg: string): ApiError {
        return new ApiError(401, msg);
    }

    static internal(msg: string): ApiError {
        return new ApiError(500, msg);
    }
}
