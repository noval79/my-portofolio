// models/organisasi.ts
import mongoose from 'mongoose';

const OrganisasiSchema = new mongoose.Schema({
  nama: String,
  tahun: String,
  deskripsi: String,
  gambar: String,
});

export default mongoose.models.Organisasi || mongoose.model("Organisasi", OrganisasiSchema);
