import mongoose from "mongoose";

async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

export default connectDB;
