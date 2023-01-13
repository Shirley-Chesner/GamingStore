import express from 'express';
import { dbRoute } from './db-router';

export const routes = express.Router();

routes.use(dbRoute);

