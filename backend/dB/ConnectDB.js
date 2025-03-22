import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.DB_URI, {});

    // Listen for the 'connected' event
    mongoose.connection.on("connected", () => {
      console.log("DB connected successfully!");
      console.log("Database Name:", mongoose.connection.db.databaseName); // Log the database name
      console.log("Host:", mongoose.connection.host); // Log the database host
      console.log("Port:", mongoose.connection.port); // Log the database port
      console.log("Connection ID:", mongoose.connection.id); // Log the connection ID
    });

    // Listen for connection errors
    mongoose.connection.on("error", (err) => {
      console.error("Error connecting to the database:", err);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
