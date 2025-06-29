'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type SkillType = {
  _id: string;
  nama: string;
  deskripsi: string;
  gambar: string;
};

export default function AdminSkillPage() {
  const [form, setForm] = useState({ nama: '', deskripsi: '', gambar: '' });
  const [skillList, setSkillList] = useState<SkillType[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const res = await axios.get('/api/skill');
    setSkillList(res.data);
  };

  const handleUploadGambar = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'portofolio');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dy6i7ksuc/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setForm((prev) => ({ ...prev, gambar: data.secure_url }));
    } catch (err) {
      alert('Upload gambar gagal!');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.gambar) {
      alert('Harap tunggu hingga gambar selesai diunggah.');
      return;
    }

    await axios.post('/api/skill', form);
    setForm({ nama: '', deskripsi: '', gambar: '' });
    fetchSkills();
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Yakin ingin menghapus skill ini?');
    if (!confirmDelete) return;
    await axios.delete('/api/skill', { data: { id } });
    fetchSkills();
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
        <h1 className="text-xl font-bold mb-4">Tambah Skill</h1>
        <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded mb-8">
          <input
            type="text"
            placeholder="Nama Skill"
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

          {uploading && <p className="text-sm text-blue-500">Mengunggah gambar...</p>}

          {form.gambar && (
            <img src={form.gambar} alt="Preview" className="w-32 mt-2 rounded border" />
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={uploading}
          >
            Simpan Skill
          </button>
        </form>

        <h2 className="text-lg font-semibold mb-2">Daftar Skill</h2>
        <div className="space-y-4">
          {skillList.map((skill) => (
            <div
              key={skill._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{skill.nama}</p>
                <p className="text-sm text-gray-600">{skill.deskripsi}</p>
                {skill.gambar && (
                  <img
                    src={skill.gambar}
                    alt={skill.nama}
                    className="w-32 mt-2 rounded"
                  />
                )}
              </div>
              <button
                onClick={() => handleDelete(skill._id)}
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
