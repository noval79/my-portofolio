import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
  nama: String,
  tahun: String,
  deskripsi: String,
  gambar: String,
});

export default mongoose.models.Education || mongoose.model("Education", EducationSchema);
