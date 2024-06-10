import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const uri = process.env.DB_URI;
    await mongoose.connect(uri, {});

    console.log("Connected database");
  } catch (error) {
    console.log(error.message);
    console.log("Connect DB failed");
  }
};

export default connectDatabase;
