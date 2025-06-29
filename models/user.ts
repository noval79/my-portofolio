import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "editor"],
    default: "admin",
  }
}, { timestamps: true });

const User = models.User || mongoose.model("User", UserSchema);
export default User;
