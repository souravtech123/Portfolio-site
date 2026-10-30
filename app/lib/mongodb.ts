import mongoose from "mongoose";

const MONGODB_URI = 'mongodb+srv://souravsuman846_db_user:qRzyowzXn3I4Hor6@cluster0.puyd7is.mongodb.net/' as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

/**
 * Cached connection to avoid re-connecting on every hot-reload in dev.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalWithMongoose = global as typeof globalThis & { mongoose?: MongooseCache };

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongoose;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
