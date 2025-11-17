import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// GET all projects (Landing page)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
});

// POST new project (Admin)
router.post("/", async (req, res) => {
  try {
    const { imageUrl, name, description } = req.body;
    const project = new Project({ imageUrl, name, description });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Error adding project" });
  }
});

export default router;
