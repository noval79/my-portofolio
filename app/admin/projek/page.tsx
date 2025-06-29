'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image'; // ✅ WAJIB agar Image bisa digunakan tanpa error

type ProjekType = {
  _id: string;
  nama: string;
  deskripsi: string;
  gambar: string;
};

export default function AdminProjekPage() {
  const [form, setForm] = useState({ nama: '', deskripsi: '', gambar: '' });
  const [projekList, setProjekList] = useState<ProjekType[]>([]);

  useEffect(() => {
    fetchProjek();
  }, []);

  const fetchProjek = async () => {
    try {
      const res = await axios.get('/api/projek');
      setProjekList(res.data);
    } catch (error) {
      console.error('Gagal mengambil data projek:', error);
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
      console.error('Gagal mengupload gambar:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.gambar) {
      alert("Tunggu sampai gambar selesai di-upload!");
      return;
    }

    try {
      await axios.post('/api/projek', form);
      alert('Projek berhasil ditambahkan!');
      setForm({ nama: '', deskripsi: '', gambar: '' });
      fetchProjek();
    } catch (error) {
      console.error('Gagal menambahkan projek:', error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Yakin ingin menghapus projek ini?');
    if (!confirmDelete) return;

    try {
      await axios.delete('/api/projek', { data: { id } });
      fetchProjek();
    } catch (error) {
      console.error('Gagal menghapus projek:', error);
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
        <h1 className="text-xl font-bold mb-4">Tambah Projek</h1>
        <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded mb-8">
          <input
            type="text"
            placeholder="Nama Projek"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
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
            required
          />
          <textarea
            placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Simpan Projek
          </button>
        </form>

        {/* List Projek */}
        <h2 className="text-lg font-semibold mb-2">Daftar Projek</h2>
        <div className="space-y-4">
          {projekList.map((projek) => (
            <div key={projek._id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">{projek.nama}</p>
                <p className="text-sm text-gray-600">{projek.deskripsi}</p>
                {projek.gambar && (
                  <div className="w-40 mt-2 overflow-hidden rounded">
                    <Image
                      src={projek.gambar}
                      alt={projek.nama}
                      width={160}
                      height={90}
                      className="rounded"
                    />
                  </div>
                )}
              </div>
              <button
                onClick={() => handleDelete(projek._id)}
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
