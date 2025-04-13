import mongoose from "mongoose";

const mongo_uri = process.env.MONGO_DB_URI!;

if (!mongo_uri) {
    throw new Error("MONGO_DB_URI is not defined in .env file");
}

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    mongoose.set("strictQuery", true);
    mongoose
        .connect(mongo_uri)
        .then(() => {
            console.log("MongoDB connected successfully");
        })
        .catch((err) => {
            console.error("MongoDB connection error:", err);
        });
};
