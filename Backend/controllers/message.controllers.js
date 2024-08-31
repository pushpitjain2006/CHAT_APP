import Conversation from "../Database/models/conversation.model.js";
import Message from "../Database/models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId], $size: 2 },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await newMessage.save();
      await conversation.save();
    }

    res
      .status(201)
      .json({ message: `Message send successfully, ${newMessage}` });
  } catch (error) {
    console.log("Message controller error");
    res.status(500).json({ error: `Internal Server Error ${error}` });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [userToChat, senderId], $size: 2 },
    }).populate("messages");
    if (!conversation) {
      res.status(200).json([]);
    }
    res.status(200).json(conversation.messages);
  } catch (error) {
    res.status(500).json({ error: `Internal error ${error}` });
  }
};
