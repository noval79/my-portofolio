// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// ✅ Gunakan globalThis untuk menghindari reinitialisasi di hot reload
declare global {
  var mongooseCache: MongooseCache | undefined;
}

const globalWithCache = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cached = globalWithCache.mongooseCache || {
  conn: null,
  promise: null,
};

async function connectDB() {
  if (cached.conn) {
    console.log("✅ MongoDB: Using cached connection.");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🔌 MongoDB: Connecting...");
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      console.log("✅ MongoDB: Connected successfully!");
      return mongoose;
    }).catch((err) => {
      console.error("❌ MongoDB: Connection failed!", err);
      cached.promise = null;
      throw err;
    });
  }

  cached.conn = await cached.promise;
  globalWithCache.mongooseCache = cached;

  return cached.conn;
}

export default connectDB;
