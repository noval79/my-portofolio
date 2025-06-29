import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  nama: String,
  tahun: String,
  deskripsi: String,
  gambar: String,
});

export default mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);
