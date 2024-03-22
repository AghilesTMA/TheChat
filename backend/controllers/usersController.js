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

const addContact = async (req, res) => {
  try {
    const { contactId } = req.body;
    const myId = req.userId;
    const done = await User.findByIdAndUpdate(myId, {
      $push: { contacts: contactId },
    });
    if (!done) return res.status(400).json({ message: "bad request" });
    return res.status(200).json({ message: "Contact added successfully!" });
  } catch (error) {
    console.error(error);
  }
};

const getContacts = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findById(id).populate(
      "contacts",
      "_id userName avatar"
    );
    if (!user) return res.status(404).json({ message: "Not Found!" });
    const { contacts } = user;
    if (contacts.length < 1) {
      return res
        .status(200)
        .json({ message: "this user doesn't have contacts!" });
    } else {
      return res.status(200).json({ data: [...contacts] });
    }
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (req, res) => {
  try {
    const { contactId } = req.body;
    const myId = req.userId;
    const done = await User.findByIdAndUpdate(myId, {
      $pull: { contacts: contactId },
    });
    if (!done)
      return res.status(400).json({ message: "something went wrong!" });
    return res.status(200).json({ message: "Contact removed successfully!" });
  } catch (error) {
    console.error(error);
  }
};

export { getUserByName, addContact, getContacts, removeContact };
