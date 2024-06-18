import { User } from "../models/User.js";

const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const regex = new RegExp(name, "i");
    const users = await User.find({ userName: { $regex: regex } }).select(
      "_id avatar userName"
    );
    if (users.length > 0) {
      return res.status(200).json({ message: "Users found!", users });
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
    return res.status(200).json({ data: [...contacts] });
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

const getMyList = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findById(id).populate("contacts", "_id");
    if (!user) return res.status(404).json({ msg: "User not found!" });
    const myList = user.contacts.map((contact) => contact._id);
    return res.status(200).json(myList);
  } catch (error) {
    console.log(error);
  }
};

export { getUserByName, addContact, getContacts, removeContact, getMyList };
