import mongoose, { Schema, models } from "mongoose";

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["unread", "read", "archived"],
    default: "unread",
  }
}, { timestamps: true });

const Contact = models.Contact || mongoose.model("Contact", ContactSchema);
export default Contact;
