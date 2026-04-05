require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

// 🔍 Debug ENV (IMPORTANT)
console.log("🔍 ENV CHECK:", {
  MONGO_URI: process.env.MONGO_URI ? "FOUND" : "MISSING",
  JWT_SECRET: process.env.JWT_SECRET ? "FOUND" : "MISSING",
  PORT: process.env.PORT || "NOT SET",
});

const startServer = async () => {
  try {
    // ✅ Connect DB
    await connectDB();
    console.log("✅ Database connected successfully");

    // ✅ Start server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // ✅ Handle unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      console.error("❌ Unhandled Rejection:", err);
      server.close(() => process.exit(1));
    });

    // ✅ Handle uncaught exceptions
    process.on("uncaughtException", (err) => {
      console.error("❌ Uncaught Exception:", err);
      process.exit(1);
    });

    // ✅ Graceful shutdown (Render friendly)
    process.on("SIGTERM", () => {
      console.log("👋 SIGTERM received. Shutting down...");
      server.close(() => {
        console.log("💤 Process terminated");
      });
    });

  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error); // full error (IMPORTANT)
    process.exit(1);
  }
};

startServer();