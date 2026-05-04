const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error(error); // 🔥 FULL ERROR (IMPORTANT)

    // ❗ DO NOT exit immediately (let server handle it)
    throw error;
  }
};

module.exports = connectDB;