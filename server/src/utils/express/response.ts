import { NextFunction, Request, Response } from 'express';
import { ErrorTypes, NotFound } from '../errors';


export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new NotFound(`Can not ${req.method} ${req.url}`);
    next(error);
    return;
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const status = ErrorTypes[err.name] ? ErrorTypes[err.name].code : 400;
    return res.status(status).json({ name: err.name, message: err.message });
};