import express from 'express';
import config from 'config';

import { routes } from './src/routes/router';

import { dbController } from "./src/controllers/db-controller";


const app = express()
const port = config.get("port")
// const dbURL: string = config.get("connectToDB");

dbController.connectToDB("mongodb://localhost:27017/GameStore");

// routes
app.use('/', routes);


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
