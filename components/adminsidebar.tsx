'use client';
import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <aside className="w-48 min-h-screen p-4 bg-gray-100">
      <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
      <nav className="flex flex-col space-y-2">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/biodata">Biodata</Link>
        <Link href="/admin/skill">Skill</Link>
        <Link href="/admin/projek">Projek</Link>
        <Link href="/admin/education">Education</Link>
        <Link href="/admin/experience">Experience</Link>
        <Link href="/admin/organisasi">Organisasi</Link>
        <Link href="/admin/activity">Activity</Link>
        <Link href="/admin/article">Article</Link>
      </nav>
    </aside>
  );
}
