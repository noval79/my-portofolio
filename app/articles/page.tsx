'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

type ArticleType = {
  _id: string;
  judul: string;
  tahun: string;
  deskripsi: string;
  gambar: string;
  link: string;
};

export default function AdminArticlePage() {
  const [form, setForm] = useState<Omit<ArticleType, '_id'>>({
    judul: '',
    tahun: '',
    deskripsi: '',
    gambar: '',
    link: '',
  });

  const [articleList, setArticleList] = useState<ArticleType[]>([]);

  const fetchArticles = async () => {
    try {
      const res = await axios.get('/api/article');
      setArticleList(res.data);
    } catch (err) {
      console.error("Gagal mengambil data artikel:", err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleUploadGambar = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portofolio");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dy6i7ksuc/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setForm({ ...form, gambar: data.secure_url });
    } catch (error) {
      console.error("Upload gambar gagal:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/article', form);
      alert('Artikel berhasil ditambahkan!');
      setForm({ judul: '', tahun: '', deskripsi: '', gambar: '', link: '' });
      fetchArticles();
    } catch (err) {
      console.error("Gagal menambahkan artikel:", err);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Yakin ingin menghapus artikel ini?');
    if (!confirmDelete) return;
    try {
      await axios.delete('/api/article', { data: { id } });
      fetchArticles();
    } catch (err) {
      console.error("Gagal menghapus artikel:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-xl font-bold mb-4">Tambah Artikel</h1>
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded mb-8">
        <input
          type="text"
          placeholder="Judul"
          value={form.judul}
          onChange={(e) => setForm({ ...form, judul: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Tahun"
          value={form.tahun}
          onChange={(e) => setForm({ ...form, tahun: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Link Berita"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleUploadGambar(e.target.files[0])}
          className="w-full"
        />
        <textarea
          placeholder="Deskripsi"
          value={form.deskripsi}
          onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Simpan</button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Daftar Artikel</h2>
      <div className="space-y-4">
        {articleList.map((item) => (
          <div key={item._id} className="border p-4 rounded flex justify-between items-start gap-4">
            <div className="flex-1">
              <p className="font-semibold">{item.judul} ({item.tahun})</p>
              <p className="text-sm text-gray-600">{item.deskripsi}</p>
              {item.link && (
                <a
                  href={item.link}
                  className="text-blue-500 text-sm underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lihat Artikel
                </a>
              )}
              {item.gambar && (
                <div className="mt-2">
                  <Image
                    src={item.gambar}
                    alt={item.judul}
                    width={160}
                    height={100}
                    className="rounded"
                  />
                </div>
              )}
            </div>
            <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">Hapus</button>
          </div>
        ))}
      </div>
    </div>
  );
}
