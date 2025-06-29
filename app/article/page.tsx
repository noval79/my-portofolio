import Image from 'next/image';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type ArticleType = {
  _id: string;
  judul: string;
  tahun: string;
  deskripsi: string;
  gambar: string;
  link: string;
};

async function getArticles(): Promise<ArticleType[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/article`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("API ERROR RESPONSE:", text);
    throw new Error("Failed to fetch articles");
  }

  return res.json();
}

export default async function ArticlePage() {
  let data: ArticleType[] = [];

  try {
    data = await getArticles();
  } catch (error) {
    console.error("Gagal mengambil data artikel:", error);
    return (
      <>
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h1 className="text-3xl font-bold text-red-600">Gagal memuat artikel</h1>
          <p className="text-gray-600 mt-4">Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Artikel</h1>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Halaman ini memuat berbagai artikel dan berita terkait saya, mulai dari peliputan acara, prestasi, hingga karya jurnalistik yang saya buat atau yang menyebut nama saya. Artikel-artikel ini mencerminkan perjalanan, pengalaman, dan kontribusi saya di bidang jurnalistik.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div key={item._id} className="border p-4 rounded shadow-sm bg-white">
              <Image
                src={item.gambar}
                alt={item.judul}
                width={400}
                height={200}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">{item.judul}</h2>
              <p className="text-gray-600 text-sm mb-2">{item.tahun}</p>
              <p className="text-gray-700 text-sm mb-4">{item.deskripsi}</p>
              <a
                href={item.link}
                className="text-blue-500 text-sm underline"
                target="_blank"
                rel="noopener noreferrer"
              >
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
