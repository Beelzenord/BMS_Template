import mongoose from "mongoose";

const MONGO_URI = 'mongodb://localhost:27017/bms';

export const connectDB = async () => {
  try {
    console.log('pretend');
    await mongoose.connect(MONGO_URI, {
        
      //useNewUrlParser: true,
     // useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

//run().catch((error) => console.error('Error:', error));