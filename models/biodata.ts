import mongoose, { Schema } from 'mongoose';

const biodataSchema = new Schema({
  nama: String,
  role: String,
  deskripsi: String,
  lokasi: String,
  linkedin: String,
  github: String,
  email: String,
  foto: {
  type: String,
  required: false,
},
}, { timestamps: true });

export default mongoose.models.Biodata || mongoose.model('Biodata', biodataSchema);
