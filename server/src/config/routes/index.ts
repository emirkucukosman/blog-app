import { Application } from 'express'

import UserRouter from './user'
import BlogRouter from './blog'

export default (app: Application) => {
    app.use('/api/user', UserRouter);
    app.use('/api/blog', BlogRouter);
}