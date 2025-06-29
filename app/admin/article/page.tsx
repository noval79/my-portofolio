'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function AdminArticlePage() {
  const [form, setForm] = useState({
    judul: '',
    deskripsi: '',
    tahun: '',
    link: '',
    gambar: null as File | null,
  });

  const [articles, setArticles] = useState<any[]>([]);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === 'gambar') {
      setForm((prev) => ({ ...prev, gambar: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchArticle = async () => {
    const res = await axios.get('/api/article');
    setArticles(res.data);
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Yakin ingin menghapus artikel ini?');
    if (!confirmDelete) return;

    await axios.delete(`/api/article/${id}`);
    fetchArticle();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.gambar) {
      alert('Mohon upload gambar terlebih dahulu.');
      return;
    }

    const data = new FormData();
    data.append('file', form.gambar);
    data.append('upload_preset', 'portofolio'); // ganti sesuai konfigurasi cloudinary kamu

    const uploadRes = await axios.post(
      'https://api.cloudinary.com/v1_1/dy6i7ksuc/image/upload',
      data
    );

    const imageUrl = uploadRes.data.secure_url;

    await axios.post('/api/article', {
      judul: form.judul,
      deskripsi: form.deskripsi,
      tahun: form.tahun,
      link: form.link,
      gambar: imageUrl,
    });

    alert('Artikel ditambahkan!');
    fetchArticle();
  };

  return (
  <div className="min-h-screen bg-white p-6">
    {/* Tombol kembali */}
    <div className="flex justify-end mb-4">
      <Link
        href="/admin"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
      >
        Kembali
      </Link>
    </div>

    <div className="max-w-2xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="judul" placeholder="Judul" onChange={handleChange} required className="border p-2 w-full" />
        <input name="tahun" placeholder="Tahun" onChange={handleChange} required className="border p-2 w-full" />
        <textarea name="deskripsi" placeholder="Deskripsi" onChange={handleChange} required className="border p-2 w-full" />
        <input name="link" placeholder="Link" onChange={handleChange} required className="border p-2 w-full" />
        <input type="file" name="gambar" onChange={handleChange} accept="image/*" required className="border p-2 w-full" />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Submit</button>
      </form>

      <hr className="my-8" />

      <h2 className="text-xl font-semibold mb-4">Daftar Artikel</h2>
      {articles.length === 0 ? (
        <p>Belum ada artikel.</p>
      ) : (
        <ul className="space-y-3">
          {articles.map((item) => (
            <li key={item._id} className="border p-4 rounded shadow-sm flex justify-between items-center">
              <div>
                <p className="font-medium">{item.judul}</p>
                <p className="text-sm text-gray-500">{item.tahun}</p>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
}