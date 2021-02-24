import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import * as UserService from '../services/user'
import { AuthorizationError } from '../utils/errors'

/*
    @route /api/user/register
    @method POST
    @description Creates a new user record
*/
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Obtain fields from request's body
        const { username, password } = req.body;

        // Generate a salt and create a hash
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create a user with the username and created hash
        await UserService.create(username, hash);
        return res.send('OK');

    } catch (error) {
        return next(error);
    }
}

/*
    @route /api/user/login
    @method POST
    @description Matches the database credentials with the sent ones and issues a token if match found
*/
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Obtain fields from request's body
        const { username, password } = req.body;

        // Try to find a user record with the same username
        const user = await UserService.findOneByUsername(username);

        // If user not found then throw error
        if (!user) {
            throw new AuthorizationError('Invalid credentials')
        }

        // Compare the passwords
        const match = await bcrypt.compare(password, user.password)

        // If no match then throw error
        if (!match) {
            throw new AuthorizationError('Invalid credentials')
        }

        // Log in success
        // Signs a new JSON web token
        const token = jwt.sign(user.toJSON(), "DEVELOPMENT_JWT_SECRET", {
            expiresIn: "6h",
        })

        return res.send({
            token,
            user: user.toJSON()
        });

    } catch (error) {
        return next(error);
    }
}

/*
    @route /api/user/me
    @method GET
    @description Returns the user itself from JWT
*/
export const me = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Obtain the JWT from the header
        const token = req.headers.authorization;

        // Decode the JWT
        const decoded = jwt.decode(token, { json: true })

        // Find the user
        const user = await UserService.findOneByUsername(decoded.username)        

        return res.send({ user })

    } catch (error) {
        return next(error);
    }
}