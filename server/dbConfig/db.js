import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB CRUD-Tiffinbox");
  } catch (error) {
    console.error("conneciton is failed to connect to database");
    process.exit(0);
  }
};
