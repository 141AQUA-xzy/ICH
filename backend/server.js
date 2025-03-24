import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import router from "./router/Client.router.js";
import { connectDB } from "./dB/ConnectDB.js";
import routing from "./router/Admin.router.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    // Add allowed frontend domains
    // origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected ", socket.id);

  // Forward client message to admins
  socket.on("client->server", (data) => {
    console.log("Message from client:", data);
    io.emit("server->admin", data); // ✅ Now all admins receive it
    //Feature of selective admins for receiving and sending data
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
});

app.use("/client", router);
app.use("/admin", routing);
// Start Server
server.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server is running on port ${PORT}`);
});    


// // 1️⃣ Import Required Packages
// // iport express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import dotenv from "dotenv";
// import helmet from "helmet";
// import compression from "compression";
// import mongoose from "mongoose";

// // 2️⃣ Load Environment Variables (.env)
// dotenv.config();

// // 3️⃣ Initialize Express App
// const app = express();
// const PORT = process.env.PORT || 5000;

// // 4️⃣ Middleware Setup
// app.use(express.json()); // Parse JSON requests
// app.use(cors()); // Enable Cross-Origin Resource Sharing
// app.use(morgan("dev")); // Logger for request details
// app.use(helmet()); // Secure HTTP headers
// app.use(compression()); // Gzip compression for better performance

// // // 5️⃣ Connect to MongoDB (Optional, if using MongoDB)
// // const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";
// // mongoose
// //   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => console.log("✅ MongoDB Connected"))
// //   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // 6️⃣ Define Routes

// app.get("/", (req, res) => {
//   res.send("🚀 Express Server Running!");
// });

// // 7️⃣ Start the Server
// app.listen(PORT, () => {
//   console.log(`✅ Server is running on port ${PORT}`);
// });

// /*
// =======================================
//    Important Packages & Their Purpose
// =======================================
// 1️⃣ express      - Core framework for creating a web server.
// 2️⃣ cors         - Enables cross-origin requests.
// 3️⃣ morgan       - Logs HTTP requests for debugging.
// 4️⃣ dotenv       - Loads environment variables from a .env file.
// 5️⃣ helmet       - Secures HTTP headers.
// 6️⃣ compression  - Gzip compression for performance optimization.
// 7️⃣ mongoose     - MongoDB ODM for database interactions.
// */

// // 🚀 Ready to go! Run `node server.js` or `nodemon server.js`
