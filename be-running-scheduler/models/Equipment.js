import mongoose from "mongoose";
const { Schema, model } = mongoose;

// ToDo: basically there could be an equipment list independent from the user so that one can choose from a predefined list
const equipmentSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true},
  type: { type: String, required: true },
  brand: { type: String },
  model: { type: String },
  distance: { type: Number },
  inUseSince: { type: Date },
  time: { type: Number },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

export default model("Equipment", equipmentSchema);
