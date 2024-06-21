import { Message } from "../models/Message.js";

const addMessage = async (req, res) => {
  try {
    const from = req.userId;
    const { to, text } = req.body;

    const messageData = {
      sender: from,
      users: [from, to],
      msg: {
        text: text,
      },
    };
    const newMessage = await Message.create({ ...messageData });

    if (newMessage) {
      return res.status(200).json({
        message: "message sent  successfully!",
        data: { fromSelf: true, text: text },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const getAllMessages = async (req, res) => {
  try {
    const from = req.userId;
    const { to } = req.params;
    const messages = await Message.find({ users: { $all: [from, to] } }).sort({
      updatedAt: 1,
    });
    if (messages.length > 0) {
      const resMsgs = messages.map((msg) => ({
        fromSelf: msg.sender.toString() === from,
        text: msg.msg.text,
      }));
      return res.status(200).json({ messages: resMsgs });
    } else {
      return res.status(200).json({messages:[]});
    }
  } catch (error) {
    console.error(error);
  }
};

export { addMessage, getAllMessages };
