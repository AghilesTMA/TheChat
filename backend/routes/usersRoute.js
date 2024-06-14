import express from "express";
import {
  addContact,
  getContacts,
  getUserByName,
  removeContact,
} from "../controllers/usersController.js";
import verifyJwt from "../middleware/Verify.js";

const usersRouter = express.Router();
usersRouter.use(verifyJwt);

usersRouter
  .get("/getuser", getUserByName)
  .patch("/addcontact", addContact)
  .patch("/removecontact", removeContact)
  .get("/getcontacts", getContacts);

export default usersRouter;
