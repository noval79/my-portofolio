'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type BiodataType = {
  _id: string;
  nama: string;
  deskripsi: string;
};

export default function AdminBiodataPage() {
  const [form, setForm] = useState({ nama: '', deskripsi: '' });
  const [biodataList, setBiodataList] = useState<BiodataType[]>([]);

  const fetchBiodata = async () => {
    const res = await fetch('/api/biodata');
    const data = await res.json();
    setBiodataList(data);
  };

  useEffect(() => {
    fetchBiodata();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/biodata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ nama: '', deskripsi: '' });
    fetchBiodata();
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Yakin ingin menghapus biodata ini?');
    if (!confirmDelete) return;
    await fetch('/api/biodata', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchBiodata();
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

      <div className="max-w-xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Tambah Biodata</h1>
        <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded mb-8">
          <input
            type="text"
            placeholder="Nama"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Simpan Biodata
          </button>
        </form>

        <h2 className="text-lg font-semibold mb-2">Daftar Biodata</h2>
        <div className="space-y-4">
          {biodataList.map((biodata) => (
            <div
              key={biodata._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{biodata.nama}</p>
                <p className="text-sm text-gray-600">{biodata.deskripsi}</p>
              </div>
              <button
                onClick={() => handleDelete(biodata._id)}
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
