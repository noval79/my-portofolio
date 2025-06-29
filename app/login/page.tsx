'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // penting untuk menyimpan cookie dari server
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push('/admin'); // ✅ redirect ke halaman admin jika sukses
    } else {
      alert('Username atau password salah!');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Login Admin</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2 block w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 block w-full"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>

      <button
        onClick={() => router.push('/')}
        className="mt-2 text-blue-500 underline block text-center"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
}
