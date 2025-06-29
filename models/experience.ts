// /models/experience.ts
import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  nama: String,
  tahun: String,
  deskripsi: String,
  gambar: String,
});

export default mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema);
