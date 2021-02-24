import { Request, Response, NextFunction } from 'express'
import { RequestValidationError } from './errors'
import Joi from 'joi'

export const validateBody = (schema: Joi.Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body);
        if (validation.error) return next(new RequestValidationError(validation.error.message));
        return next();
    }
}