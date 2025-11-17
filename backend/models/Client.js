import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    designation: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
