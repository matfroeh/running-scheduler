import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: [true, "Username is required"] },
  email: { type: String, required: [true, "Email  is required"], unique: true },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // admin needs to be set directly via database management for now
  equipmentList: [
    {
      equipmentItem: { type: String },
      equipmentType: { type: String },
      equipmentBrand: { type: String },
      equipmentModel: { type: String },
      equipmentDistance: { type: Number },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default model("User", userSchema);
