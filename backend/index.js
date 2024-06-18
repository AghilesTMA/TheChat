import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { PORT } from "./config.js";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import messagesRouter from "./routes/messagesRoute.js";
import usersRouter from "./routes/usersRoute.js";
import Credentials from "./middleware/Credentials.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{});

app.use(Credentials);
const whiteList = ["http://localhost:5173"];
app.use(cors({ origin: whiteList }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/messages", messagesRouter);
app.use("/users", usersRouter);

app.get("/", (_, res) => {
  return res.status(200).json({ message: "Hello there!" });
});

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to database");
    httpServer.listen(PORT, () =>
      console.log(`App running on port ${PORT}`)
    );
  })
  .catch((err) => console.log(err));


io.on("connection", (socket) => {
  console.log("user connected:" + socket);
});