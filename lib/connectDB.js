// /lib/connectDB.js ya /lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  return client; // Ab ismein db() method available hoga
}




// // lib/dbConnect.js
// import mongoose from "mongoose";

// export const connectDB = async () => {
//   if (mongoose.connections[0].readyState) return;
//   await mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// export default connectDB;




// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Please define MONGODB_URI in your .env.local");
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export async function connectToDatabase() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }).then((mongoose) => {
//       return { connection: mongoose };
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }











// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI; // Put in .env.local

// if (!MONGODB_URI) {
//   throw new Error("Please define MONGODB_URI in your .env.local");
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export async function connectToDatabase() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }).then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }
