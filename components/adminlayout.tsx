'use client';

import { useRouter } from 'next/navigation';
import AdminSidebar from './adminsidebar';
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6"></h2>
        <AdminSidebar />
      </aside>

      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-200 px-6 py-4 flex justify-end items-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
          >
            Logout
          </button>
        </header>

        {/* Konten halaman */}
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
