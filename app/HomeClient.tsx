'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";

type BiodataType = {
  nama: string;
  role: string;
  deskripsi: string;
  lokasi: string;
  linkedin: string;
  github: string;
  email: string;
  foto: string;
};

type SkillType = {
  _id: string;
  nama: string;
  deskripsi: string;
  gambar: string; 
};

type ProjekType = {
  _id: string;
  nama: string;
  deskripsi: string;
  gambar: string;
};

type EducationType = {
  _id: string;
  nama: string;
  tahun: string;
  deskripsi: string;
  gambar: string;
};

type organisasiType = {
_id: string;
nama: string;
tahun: string;
deskripsi: string;
gambar: string;
};

type ExperienceType = {
  _id: string;
  nama: string;
  tahun: string;
  deskripsi: string;
  gambar: string;
};

type ActivityType = {
  _id: string;
  nama: string;
  tahun: string;
  deskripsi: string;
  gambar: string;
};


export default function HomeClient() {
  const [biodata, setBiodata] = useState<BiodataType | null>(null);
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [projek, setProjek] = useState<ProjekType[]>([]);
  const [education, setEducation] = useState<EducationType[]>([]);
  const [experience, setExperience] = useState<ExperienceType[]>([]);
  const [organisasi, setorganisasi] = useState<organisasiType[]>([]);
  const [activity, setActivity] = useState<ActivityType[]>([]);

  useEffect(() => {
    axios.get('/api/biodata')
      .then((res) => setBiodata(res.data[0]))
      .catch((err) => console.error('Gagal mengambil data biodata:', err));

    axios.get('/api/skill')
      .then((res) => setSkills(res.data))
      .catch((err) => console.error('Gagal mengambil data skill:', err));

    axios.get('/api/projek')
      .then((res) => setProjek(res.data))
      .catch((err) => console.error('Gagal mengambil data projek:', err));
 
    axios.get('/api/education')
      .then((res) => setEducation(res.data))
      .catch((err) => console.error('Gagal mengambil data education:', err));  
    
     axios.get('/api/experience')
    .then((res) => setExperience(res.data))
    .catch((err) => console.error('Gagal mengambil data experience:', err));
    
    axios.get('/api/organisasi')
    .then((res) => setorganisasi(res.data))
    .catch((err) => console.error('Gagal mengambil data organisasi:', err));

     axios.get('/api/activity')
    .then((res) => setActivity(res.data))
    .catch((err) => console.error('Gagal mengambil data activity:', err));
    
}, []);

  if (!biodata) return <div className="text-center p-10">Loading...</div>;

  return (
    <>
    <Navbar/>
    <Sidebar/>
    <div className="pl-56 min-h-screen bg-gradient-to-b from-indigo-100 to-white text-gray-800 p-6 sm:p-12 font-sans">
      {/* Biodata Card */}
      <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
          <div className="flex justify-center mb-6">
            <Image src={biodata.foto} alt="Foto Profil" width={150} height={150} className="rounded-full object-cover border-4 border-blue-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">{biodata.nama}</h1>
          <h2 className="text-xl sm:text-2xl text-gray-600 mb-4">{biodata.role}</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">{biodata.deskripsi}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
            <p>📍 {biodata.lokasi}</p>
            <a href={`mailto:${biodata.email}`} className="text-blue-600 hover:underline">📧 {biodata.email}</a>
            <a href={biodata.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">🔗 LinkedIn</a>
            <a href={biodata.github} target="_blank" className="text-gray-800 hover:underline">🐱 GitHub</a>
          </div>
        </section>

      {/* Skill Set Section */}
      <section className="mt-20 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Skill Set</h2>
          <p className="text-gray-600 mb-10 px-4 sm:px-0">
            Jelajahi keahlian saya dari pengembangan web hingga komunikasi bisnis.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
            {skills.map((skill) => (
              <div key={skill._id} className="p-4 border rounded text-center shadow-sm">
                <img src={skill.gambar} alt={skill.nama} className="w-20 h-20 mx-auto mb-2 object-contain" />
                <h3 className="text-lg font-semibold">{skill.nama}</h3>
                <p className="text-sm text-gray-600">{skill.deskripsi}</p>
              </div>
            ))}
          </div>
        </section>

      {/* Projek Section */}
      <main className="pl-56 pr-4 pt-6">
      <div id="projects" className="mt-20 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">My Project</h2>
        <p className="text-gray-600 mb-10 px-4 sm:px-0">
          Explore my Project. Discover the projects I’ve worked on from web development to UI/UX design and business innovation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {projek.map((item) => (
      <div key={item._id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="w-full h-48 bg-gray-100 relative">
          {item.gambar ? (
  <img 
  src={item.gambar} 
  alt={item.nama} 
   className="w-20 h-20 mx-auto mb-2 object-contain" />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              No Image
            </div>
          )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">{item.nama}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </main>

{/* Education Section */}
<main className="pl-56 pr-4 pt-6">
<div id="education" className="mt-20 max-w-5xl mx-auto text-center">
  <h2 className="text-3xl font-bold text-indigo-600 mb-4">Education</h2>
  <p className="text-gray-600 mb-10 px-4 sm:px-0">
    My educational journey has shaped my passion for technology, critical thinking, and continuous learning in this field.
  </p>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {education.map((item) => (
      <div key={item._id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
        {item.gambar ? (
          <img 
          src={item.gambar} 
          alt={item.nama} 
          className="w-20 h-20 mx-auto mb-2 object-contain" />
        ) : (
          <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <div className="p-4 text-center">
          <h3 className="font-semibold text-base sm:text-lg text-gray-800">{item.nama}</h3>
          <p className="text-sm text-gray-500 mb-1">{item.tahun}</p>
          <p className="text-sm text-gray-600">{item.deskripsi}</p>
        </div>
      </div>
    ))}
  </div>
</div>
</main>

{/* Experience Section */}
<main className="pl-56 pr-4 pt-6">
<div id="experience" className="mt-20 max-w-5xl mx-auto text-center">
  <h2 className="text-3xl font-bold text-indigo-600 mb-4">Experience</h2>
  <p className="text-gray-600 mb-10 px-4 sm:px-0">
    My experiences reflect a journey of building, creating, and contributing — from managing a business to developing tech projects and collaborating in creative media.
  </p>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {experience.map((item) => (
      <div key={item._id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="w-full h-48 bg-gray-100 relative">
          {item.gambar ? (
            <img 
            src={item.gambar} 
            alt={item.nama} 
             className="w-20 h-20 mx-auto mb-2 object-contain" />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div className="p-4 text-center">
          <h3 className="font-semibold text-lg text-gray-800">{item.nama}</h3>
          <p className="text-sm text-gray-500 mb-1">{item.tahun}</p>
          <p className="text-gray-600 text-sm">{item.deskripsi}</p>
        </div>
      </div>
    ))}
  </div>
</div>
</main>

{/* Organization Section */}
<main className="pl-56 pr-4 pt-6">
<div id="organization" className="mt-20 max-w-5xl mx-auto text-center">
  <h2 className="text-3xl font-bold text-indigo-600 mb-4">Organization</h2>
  <p className="text-gray-600 mb-10 px-4 sm:px-0">
    My organization involvement has shaped my leadership, communication, and collaborative skills across diverse projects.
  </p>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {organisasi.map((item) => (
      <div
        key={item._id}
        className="bg-white border rounded-lg shadow-sm overflow-hidden"
      >
        <div className="w-full h-48 bg-gray-100 relative">
          {item.gambar ? (
            <img
              src={item.gambar}
              alt={item.nama}
               className="w-20 h-20 mx-auto mb-2 object-contain"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div className="p-4 text-center">
          <h3 className="font-semibold text-lg text-gray-800">
            {item.nama}
          </h3>
          <p className="text-sm text-gray-500 mb-1">{item.tahun}</p>
          <p className="text-gray-600 text-sm">{item.deskripsi}</p>
        </div>
      </div>
    ))}
  </div>
</div>
</main>

{/* Activity Section */}
<main className="pl-56 pr-4 pt-6">
<div id="activity" className="mt-20 max-w-5xl mx-auto text-center">
  <h2 className="text-3xl font-bold text-indigo-600 mb-4">Activity</h2>
  <p className="text-gray-600 mb-10 px-4 sm:px-0">
    Some of the activities I've done, showing my passion for creativity, learning, and collaboration.
  </p>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {activity.map((item) => (
      <div key={item._id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="w-full h-48 bg-gray-100 relative">
          {item.gambar ? (
            <img 
            src={item.gambar} 
            alt={item.nama} 
             className="w-20 h-20 mx-auto mb-2 object-contain" />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div className="p-4 text-center">
          <h3 className="font-semibold text-lg text-gray-800">{item.nama}</h3>
          <p className="text-sm text-gray-500 mb-1">{item.tahun}</p>
          <p className="text-gray-600 text-sm">{item.deskripsi}</p>
        </div>
      </div>
    ))}
  </div>
</div>
</main>

      {/* Footer */}

<Footer/>

    </div> 
    </>
  );
}
