'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import { ChangeEvent, FormEvent } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    try {
      const res = await axios.post('/api/contact', form);
      if (res.data.success) {
        alert('Message sent successfully!');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Failed to send message.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    }
  };

  return (
    <>
      <Navbar />
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-4">Contact Me</h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Feel free to reach out to me through any of the platforms below or send a direct message using the form.
        </p>

        {/* Sosial Media */}
        <div className="flex justify-center gap-6 mb-12 text-2xl">
          <Link href="mailto:muhammadnaufal2541@gmail.com" className="text-gray-700 hover:text-indigo-600"><FaEnvelope /></Link>
          <Link href="https://www.linkedin.com/in/muhammad-noval-15b218292/" target="_blank" className="text-gray-700 hover:text-indigo-600"><FaLinkedin /></Link>
          <Link href="https://github.com/noval79" target="_blank" className="text-gray-700 hover:text-indigo-600"><FaGithub /></Link>
          <Link href="https://www.instagram.com/mhd.novaalll/" target="_blank" className="text-gray-700 hover:text-indigo-600"><FaInstagram /></Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
          <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} className="w-full p-2 border rounded" />
          <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} rows={5} className="w-full p-2 border rounded" required />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Send Message</button>
        </form>

        {/* Service Fee */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-indigo-600">Service Fee</h2>
          <p className="text-gray-700 text-lg mt-1">Rp150.000 / jam</p>
          <p className="text-sm text-gray-500 max-w-md mx-auto mt-2">
            This is my estimated freelance hourly rate, which may vary depending on the project scope and timeline.
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}