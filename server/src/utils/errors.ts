export const ErrorTypes = {
    NotFound: {
        name: 'NotFound',
        code: 404
    },
    AuthorizationError: {
        name: 'AuthorizationError',
        code: 401
    },
    RequestValidationError: {
        name: 'RequestValidationError',
        code: 400
    }
}

export class RequestValidationError extends Error {
    constructor(error: string) {
        super();
        this.name = ErrorTypes.RequestValidationError.name;
        this.message = error;
        Error.captureStackTrace(this, RequestValidationError);
    }
}

export class NotFound extends Error {
    constructor(...args: any[]) {
        super(...args);
        this.name = ErrorTypes.NotFound.name;
        Error.captureStackTrace(this, NotFound);
    }
}
export class AuthorizationError extends Error {
    constructor(message: string = "Unauthorized", ...args: any[]) {
        super(...args);
        this.message = message;
        Error.captureStackTrace(this, AuthorizationError);
    }
}