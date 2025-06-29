'use client';

import Link from 'next/link';

export default function Navbar() {

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="relative max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Judul tengah */}
      

        {/* Spacer kiri */}
        <div />

        {/* Menu kanan */}
        <div className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium">| Home </Link>
          <Link href="/articles" className="text-gray-700 hover:text-indigo-600 font-medium">| Article </Link>
          <Link href="/contact" className="text-gray-700 hover:text-indigo-600 font-medium">| Contact Me</Link>
          <Link href="/admin" className="text-gray-700 hover:text-indigo-600 font-medium">| Admin |</Link>
        </div>
      </div>
    </nav>
  );
}
