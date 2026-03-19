import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URL;
        console.log("Connecting to MongoDB...",  mongoUrl);
        if (!mongoUrl) {
            throw new Error("MONGODB_URL is not set");
        }
        await mongoose.connect(mongoUrl);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;
