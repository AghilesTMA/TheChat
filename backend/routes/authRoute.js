import express from "express";
import {
  logIn,
  logOut,
  signUp,
  verifyLogIn,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", logIn);
authRouter.get("/logout", logOut);
authRouter.get("/verifylogin", verifyLogIn);

export default authRouter;
