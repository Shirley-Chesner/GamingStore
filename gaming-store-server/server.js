const express = require('express')
// const cors = require('cors')
const config = require('config')
const mongoose = require('mongoose')


const app = express()
// const port = config.get("port")
const port = 1234

// app.use(cors)

app.get('/', (req, res) => {
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://localhost:27017/GameStore");
    const connection = mongoose.connection;
    console.log(connection.readyState);
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})