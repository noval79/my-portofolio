// models/article.ts
import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    judul: String,
    tahun: String,
    deskripsi: String,
    link: String,
    gambar: String,
  },
  { timestamps: true }
);

export default mongoose.models.Article || mongoose.model('Article', articleSchema);
