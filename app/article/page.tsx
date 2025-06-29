import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

async function getArticles() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/article`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("API ERROR RESPONSE:", text); // debug
    throw new Error("Failed to fetch articles");
  }

  return res.json(); // Pastikan JSON valid
}

export default async function ArticlePage() {
  const data = await getArticles();
  if (!Array.isArray(data)) return <p>Gagal memuat data artikel.</p>;
  console.log("Halaman artikel dirender");

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Artikel</h1>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          This page features various articles and news items related to me, ranging from event coverage, achievements, to journalistic works I have created or that mention my name. These articles reflect my journey, experiences, and contributions in the field of journalism.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item: any) => (
            <div key={item._id} className="border p-4 rounded shadow-sm bg-white">
              <img src={item.gambar} alt={item.judul} className="w-full h-40 object-cover rounded mb-4" />
              <h2 className="text-xl font-semibold">{item.judul}</h2>
              <p className="text-gray-600 text-sm mb-2">{item.tahun}</p>
              <p className="text-gray-700 text-sm mb-4">{item.deskripsi}</p>
              <a href={item.link} className="text-blue-500 text-sm underline" target="_blank" rel="noopener noreferrer">
                Baca Selengkapnya →
              </a>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
