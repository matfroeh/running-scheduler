import mongoose from "mongoose";
const { Schema, model } = mongoose;

// ToDo: basically there could be an equipment list independent from the user so that one can choose from a predefined list
const equipmentSchema = new Schema({
  equipmentOwner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  equipmentName: { type: String, required: true},
  equipmentType: { type: String, required: true },
  equipmentBrand: { type: String },
  equipmentModel: { type: String },
  equipmentDistance: { type: Number },
  equipmentTime: { type: Number },
});

export default model("Equipment", equipmentSchema);
