import mongoose from "mongoose";
const { Schema, model } = mongoose;

// ToDo: basically there could be an equipment list independent from the user so that one can choose from a predefined list
const equipmentSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true},
  type: { type: String, required: true },
  brand: { type: String },
  model: { type: String },
  image: { type: Schema.Types.ObjectId, ref: "Image" },
  distance: { type: Number, default: 0, required: true },
  inUseSince: { type: Date, default: Date.now, required: true },
  time: { type: Number, default: 0, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active", required: true },
});

export default model("Equipment", equipmentSchema);
