import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
    process.exit(1);
  }
};
