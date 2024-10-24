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
  equipmentList: [{ type: Schema.Types.ObjectId, ref: "Equipment" }],
  
  createdAt: { type: Date, default: Date.now },
});

export default model("User", userSchema);
