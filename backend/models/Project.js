import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
