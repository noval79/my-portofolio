import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectMongo from '@/lib/mongodb';
import Contact from '@/models/contact';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    await connectMongo(); // Connect to MongoDB

    // Simpan ke database
    await Contact.create({ name, email, subject, message });

    // Kirim email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: subject || 'No Subject',
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
