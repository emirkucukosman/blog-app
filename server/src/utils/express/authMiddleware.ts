import { NextFunction, Request, Response } from "express";
import { AuthorizationError } from '../errors'
import jwt from 'jsonwebtoken'

export const authRequest = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) return next(new AuthorizationError());
        try {
            const verify = jwt.verify(token, "DEVELOPMENT_JWT_SECRET");
            if (!verify) return next(new AuthorizationError());
        } catch (error) {
            return next(new AuthorizationError());
        }
        return next();
    }
}