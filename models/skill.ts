// models/skill.ts
import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  nama: String,
  deskripsi: String,
  gambar: String,
});

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
