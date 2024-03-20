import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

const signUp = async (req, res) => {
  const salt = 10;
  try {
    const { userName, email, passWord } = req.body;

    if (!userName || !email || !passWord) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const nameFound = await User.findOne({ userName });
    if (nameFound) {
      return res.status(400).json({ message: "This userName already existe" });
    }

    const emailFound = await User.findOne({ email });
    if (emailFound) {
      return res.status(400).json({ message: "This email already existe" });
    }
    if (passWord.length < 6) {
      return res.status(400).json({ message: "Password is too short!!" });
    }

    const hashedPassWord = await bcrypt.hash(passWord, salt);
    const newUserData = { userName, email, passWord: hashedPassWord };
    const newUser = await User.create(newUserData);

    const userData = {
      id: newUser._id,
      userName: newUser.userName,
      email,
    };

    const token = jwt.sign(userData, process.env.TOKEN_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User Created successfully!",
      data: { ...userData },
    });
  } catch (err) {
    console.error(err);
  }
};

const logIn = async (req, res) => {
  try {
    const { email, passWord } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser)
      return res.status(400).json({ message: "This user doesn't exist!" });

    const goodPassword = bcrypt.compare(passWord, foundUser.passWord);
    if (!goodPassword)
      return res.status(400).json({ message: "Wrong password!" });

    const userData = {
      id: foundUser._id,
      userName: foundUser.userName,
      email,
    };

    const token = jwt.sign(userData, process.env.TOKEN_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User loged in ",
      data: { ...userData },
    });
  } catch (err) {
    console.error(err);
  }
};

const logOut = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
    res.status(200).json({ message: "Cookie cleared" });
  } catch (err) {
    console.error(err);
  }
};

const verifyLogIn = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) res.status(400).json({ message: "not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden!" });
      const userData = {
        ...decoded,
      };
      return res
        .status(200)
        .json({ message: "User logged in!", data: { ...userData } });
    });
  } catch (err) {
    console.error(err);
  }
};

export { signUp, logIn, logOut, verifyLogIn };
