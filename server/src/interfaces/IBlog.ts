import { Document } from 'mongoose'

export default interface IBlog extends Document {
    title: string;
    body: string;
    author: string;
}