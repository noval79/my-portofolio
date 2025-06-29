// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) {
    console.log("MongoDB: Using cached connection.");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB: Successfully connected!");
      return mongoose;
    }).catch((error) => {
      console.error("MongoDB: Connection failed!", error);
      cached.promise = null; // Reset promise on failure
      throw error; // Re-throw to propagate the error
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
