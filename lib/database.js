import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDatabase = async () => {
  try {
    const uri = process.env.SERVER_URL;
    await mongoose.connect(uri, {});

    console.log("Connected database");
  } catch (error) {
    console.log(error.message);
    console.log("Connect DB failed");
  }
};

export default connectDatabase;
