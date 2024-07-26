// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       console.log('MongoDB connected successfully');
//       return mongoose;
//     }).catch((err) => {
//       console.error('MongoDB connection error:', err);
//       cached.promise = null; // Reset the promise to allow for retries
//       throw err;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// // dbConnect();

// export default dbConnect;


import mongoose from 'mongoose';

// Database connection function
const dbConnect = async () => {
    try {
        // Ensure the environment variable is set
        if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
            throw new Error('NEXT_PUBLIC_MONGODB_URI environment variable is not set.');
        }

        // Connect to MongoDB
        const connection = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Log successful connection
        console.log(`Database connected successfully to ${connection.connection.host}`);
    } catch (error) {
        // Handle and log any errors during connection
        console.error('Error connecting to the database:', error.message);
    }
};

export default dbConnect;

