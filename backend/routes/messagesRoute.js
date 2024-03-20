import express from "express";
import {
  addMessage,
  getAllMessages,
} from "../controllers/messagesController.js";

const messagesRouter = express.Router();

messagesRouter.post("/getmessages", getAllMessages);
messagesRouter.post("/addmessage", addMessage);

export default messagesRouter;
