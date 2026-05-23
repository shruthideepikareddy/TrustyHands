import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await Message.create({ name, email, subject, message });
    return res.status(201).json({ message: "Message sent successfully", data: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error handling contact submission" });
  }
});

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ message: "Server error fetching messages" });
  }
});

export default router;
