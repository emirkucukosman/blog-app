import { Request, Response, NextFunction } from 'express'
import * as BlogService from '../services/blog'
import * as Validation from '../validation/blog'
import { RequestValidationError } from '../utils/errors'

/*
    @route /api/blog
    @method GET
    @description Gets all of the blogs
*/
export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = await BlogService.findAll();
        return res.send(blogs);
    } catch (error) {
        return next(error);
    }
}

/*
    @route /api/blog/:author
    @method GET
    @description Gets all of the blogs by author
*/
export const findByAuhtor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { author } = req.params;
        const blogs = await BlogService.findByAuthor(author);
        return res.send(blogs);
    } catch (error) {
        return next(error);
    }
}

/*
    @route /api/blog
    @method POST
    @description Creates a new blog record
*/
export const create = async (req: Request, res: Response, next: NextFunction) => {
    
    const validation = Validation.validateCreate.validate(req.body);
    if (validation.error) {
        return next(new RequestValidationError(validation.error.message))
    }

    try {
        const { title, body, author } = req.body;
        const blog = await BlogService.create(title, body, author);
        return res.send(blog);
    } catch (error) {
        return next(error);
    }
}

/*
    @route /api/blog/:id
    @method DELETE
    @description Deletes a blog record by its id
*/
export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await BlogService.deleteById(id);
        return res.send("OK");
    } catch (error) {
        return next(error);
    }
}