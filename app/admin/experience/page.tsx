'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image'; // ✅ Diperlukan karena kita menggunakan <Image />

type ExperienceType = {
  _id: string;
  nama: string;
  tahun: string;
  deskripsi: string;
  gambar: string;
};

export default function AdminExperiencePage() {
  const [form, setForm] = useState({ nama: '', tahun: '', deskripsi: '', gambar: '' });
  const [experienceList, setExperienceList] = useState<ExperienceType[]>([]);

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const res = await axios.get('/api/experience');
      setExperienceList(res.data);
    } catch (error) {
      console.error('Gagal mengambil data pengalaman:', error);
    }
  };

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
      console.error('Upload gambar gagal:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.gambar) {
      alert("Gambar belum diupload!");
      return;
    }

    try {
      await axios.post('/api/experience', form);
      alert('Pengalaman berhasil ditambahkan!');
      setForm({ nama: '', tahun: '', deskripsi: '', gambar: '' });
      fetchExperience();
    } catch (error) {
      console.error('Gagal menambahkan pengalaman:', error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Yakin ingin menghapus pengalaman ini?');
    if (!confirmDelete) return;

    try {
      await axios.delete('/api/experience', { data: { id } });
      fetchExperience();
    } catch (error) {
      console.error('Gagal menghapus pengalaman:', error);
    }
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
        <h1 className="text-xl font-bold mb-4">Tambah Pengalaman</h1>
        <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded mb-8">
          <input
            type="text"
            placeholder="Nama Pengalaman"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
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
          <textarea
            placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUploadGambar(file);
            }}
            className="w-full p-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Simpan
          </button>
        </form>

        <h2 className="text-lg font-semibold mb-2">Daftar Pengalaman</h2>
        <div className="space-y-4">
          {experienceList.map((item) => (
            <div key={item._id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.nama} ({item.tahun})</p>
                <p className="text-sm text-gray-600">{item.deskripsi}</p>
                {item.gambar && (
                  <div className="w-40 mt-2 rounded overflow-hidden">
                    <Image
                      src={item.gambar}
                      alt={item.nama}
                      width={160}
                      height={90}
                      className="rounded"
                    />
                  </div>
                )}
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
