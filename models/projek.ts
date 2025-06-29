import mongoose from 'mongoose';

const ProjekSchema = new mongoose.Schema({
  nama: String,
  deskripsi: String,
  gambar: String,
});

export default mongoose.models.Projek || mongoose.model("Projek", ProjekSchema);
