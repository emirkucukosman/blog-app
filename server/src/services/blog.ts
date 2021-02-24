import Blog from '../models/Blog'

export const findAll = async () => await Blog.find({}).sort({ createdAt: -1 });

export const findByAuthor = async (author: string) => await Blog.find({ author });

export const create = async (title: string, body: string, author: string) => await Blog.create({ title, body, author });

export const deleteById = async (_id: string) => await Blog.findOneAndDelete({ _id })