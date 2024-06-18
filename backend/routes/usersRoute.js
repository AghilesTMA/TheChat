import express from "express";
import {
  addContact,
  getContacts,
  getUserByName,
  removeContact,
  getMyList
} from "../controllers/usersController.js";
import verifyJwt from "../middleware/Verify.js";

const usersRouter = express.Router();
usersRouter.use(verifyJwt);

usersRouter
  .get("/getuser/:name", getUserByName)
  .patch("/addcontact", addContact)
  .patch("/removecontact", removeContact)
  .get("/getcontacts", getContacts)
  .get("/myList",getMyList);

export default usersRouter;
