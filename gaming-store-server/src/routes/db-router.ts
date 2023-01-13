
import { Router } from 'express';
import { dbController } from './../controllers/db-controller'

export const dbRoute = Router();

dbRoute.get('/', (req, res) => {
    res.send("What's up doc ?!");
});

dbRoute.get('/comments', (req, res) => {
    dbController.getComments().then((a) => {
            res.send(a)
    });
});
