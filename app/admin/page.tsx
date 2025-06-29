import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminLayout from '@/components/adminlayout';

export default async function AdminDashboardPage() {
  const cookieStore = cookies(); // cookies() seharusnya langsung usable
  const auth = (cookieStore as any).get('auth')?.value; // 👈 sementara cast ke any

  if (auth !== 'true') {
    redirect('/login');
  }

  return (
    <AdminLayout>
  <div className="flex justify-center items-center flex-col text-center mt-8">
    <h1 className="text-2xl font-bold mb-2">Dashboard Admin</h1>
    <p className="text-base text-gray-700 max-w-xl">
      Selamat datang! Gunakan sidebar untuk mengelola konten portofolio Anda seperti biodata, skill, projek, hingga aktivitas.
      Halaman ini adalah pusat kontrol untuk semua data yang akan ditampilkan di website utama.
    </p>
  </div>
</AdminLayout>
  );
}
