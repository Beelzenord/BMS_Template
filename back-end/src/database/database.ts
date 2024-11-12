import mongoose from "mongoose";
import dotenv from "dotenv";
import path = require("path");
dotenv.config({ path: path.join(__dirname, '../../.env') });


const MONGO_URI = process.env.MONGO_URI as string;  // Retrieve the environment variable 

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
        
      
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

