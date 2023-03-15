import express from "express";
import config from "config";
import bodyParser from "body-parser";
import cors from "cors";

import { routes } from "./src/routes/router";
import { dbController } from "./src/controllers/db-controller";

const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const port = config.get("port");
app.use(cors());

// const dbURL: string = config.get("connectToDB");

dbController.connectToDB("mongodb://localhost:27017/GameStore");

// routes
app.use(bodyParser.json());
app.use("/", routes);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET"],
  },
});

io.on("connect", (socket: any) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("admin", async () => {
    console.log("help");
    dbController.getAdminInfo().then((info) => {
      io.emit("current users", info.current_users);
      io.emit("earning", info.earning);
    });
    dbController
      .getHighestOfGames({ how_many_bought: -1 }, 10)
      .then((games) => {
        io.emit("highest games", games);
      });
    await dbController
      .getHighestOfComments({ likes: -1 }, 10)
      .then((comments) => {
        io.emit("top comments", comments);
      });
    const users = await dbController.getUsers();
    io.emit("all users", users.length);
    dbController.getComments();
  });
  socket.on("user joined", () => {
    dbController.addCurrentUsers().then(() => {
      io.emit("admin");
    });
  });
  socket.on("user left", () => {
    dbController.removeCurrentUsers().then(() => {
      io.emit("admin");
    });
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function sendAdminInfoUpdate() {
  dbController.getAdminInfo().then((a) => {
    io.emit("current users", a.current_users);
  });
}
