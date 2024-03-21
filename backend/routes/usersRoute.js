import express from "express";
import { getUserByName } from "../controllers/usersController.js";
import verifyJwt from "../middleware/Verify.js";

const usersRouter = express.Router();
usersRouter.use(verifyJwt);

usersRouter.post("/getuser", getUserByName);

export default usersRouter;
