import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { PORT } from "./config.js";
import cors from 'cors';
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import messagesRouter from "./routes/messagesRoute.js";
import usersRouter from "./routes/usersRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/auth",authRouter);
app.use("/messages",messagesRouter);
app.use("/users",usersRouter);


app.get("/", (_, res) => {
  return res.status(200).json({ message: "Hello there!" });
});

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => console.log(`App running on port ${PORT}`));
  })
  .catch((err) => console.err(err));
