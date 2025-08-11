import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Library_Management",
    })
    .then(() => {
      console.log("Database Connected Successfully...");
    })
    .catch((e) => {
      console.log("Error while Connectiong...", e);
    });
};
