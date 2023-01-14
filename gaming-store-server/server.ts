import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';

import { routes } from './src/routes/router';


import { dbController } from "./src/controllers/db-controller";


const app = express()
const port = config.get("port")
// const dbURL: string = config.get("connectToDB");

dbController.connectToDB("mongodb://localhost:27017/GameStore");

// routes
app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
