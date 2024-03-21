import { User } from "../models/User.js";

const getUserByName = async (req, res) => {
  try {
    const { userName } = req.body;
    const user = await User.findOne({ userName });
    if (user) {
      const userData = {
        userName,
        id: user._id,
        email: user.email,
      };
      return res
        .status(200)
        .json({ message: "User found!", user: { ...userData } });
    } else {
      return res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    console.error(error);
  }
};

export { getUserByName };
