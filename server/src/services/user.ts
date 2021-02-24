import User from '../models/User';
import IUser from '../interfaces/IUser'

export const create = async (username: string, password: string) => await User.create({ username, password })

export const findOneByUsername = async (username: string) => await User.findOne({ username })