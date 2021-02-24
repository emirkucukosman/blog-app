import express from 'express'
import configureRoutes from './config/routes'
import dbConfig from '../db/config'
import mongoose from 'mongoose'
import cors from 'cors'
import { errorHandler, notFound } from './utils/express/response'

export default async (): Promise<express.Application> => {

    const { host, database, settings } = dbConfig;

    try {
        await mongoose.connect(`${host}/${database}`, settings);
    } catch (error) {
        console.error(`Erro while connecting to database: ${error}`);
    }

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    configureRoutes(app);

    app.use(errorHandler);
    app.use(notFound);

    return app;
}