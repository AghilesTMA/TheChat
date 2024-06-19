import express from "express";
import {
  addMessage,
  getAllMessages,
} from "../controllers/messagesController.js";
import verifyJwt from "../middleware/Verify.js";

const messagesRouter = express.Router();
messagesRouter.use(verifyJwt);

messagesRouter.get("/getmessages/:to", getAllMessages);
messagesRouter.post("/addmessage", addMessage);

export default messagesRouter;
