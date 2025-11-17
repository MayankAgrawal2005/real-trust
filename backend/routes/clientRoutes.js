import express from "express";
import Client from "../models/Client.js";

const router = express.Router();

// GET all clients (Landing page)
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: "Error fetching clients" });
  }
});

// POST new client (Admin)
router.post("/", async (req, res) => {
  try {
    const { imageUrl, name, description, designation } = req.body;
    const client = new Client({ imageUrl, name, description, designation });
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ message: "Error adding client" });
  }
});

export default router;
