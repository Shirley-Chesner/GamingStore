import mongoose from "mongoose";
const config = require('config')

export function connectToDB() {
    mongoose.connect(config.get("dbHostname"));
    const connection = mongoose.connection;
    connection.once("open", function() {
    console.log("Connection with MongoDB was successful");
    });
}