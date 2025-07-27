// Import necessary modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Import routes
import userRoutes from "./routes/userRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // optional but good for avoiding deprecation warnings
    useUnifiedTopology: true, // ensures stable connection
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("✅ Server running on port 5000"));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

  // Not Found Route Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.originalUrl}`);
  next();
});
