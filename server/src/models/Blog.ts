import { Schema, model } from 'mongoose'
import IBlog from '../interfaces/IBlog'

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

export default model<IBlog>('Blog', blogSchema);