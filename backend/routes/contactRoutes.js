import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST contact form (Landing page)
router.post("/", async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;
    const contact = new Contact({ fullName, email, mobile, city });
    await contact.save();
    res.status(201).json({ message: "Contact saved", contact });
  } catch (err) {
    res.status(500).json({ message: "Error saving contact" });
  }
});

// GET all contacts (Admin)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

export default router;
