import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

// POST subscribe (Landing page)
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Already subscribed" });
    }
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: "Subscribed", subscriber });
  } catch (err) {
    res.status(500).json({ message: "Error subscribing" });
  }
});

// GET all subscribers (Admin)
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching subscribers" });
  }
});

export default router;
