const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const gigRoute = require("./routes/gig.routes");
const proposalRoute = require("./routes/proposal.routes");

const app = express();

// 🔥 MUST BE FIRST
app.set("trust proxy", 1);

app.use(cors({
  origin: "https://workflix-frontend.onrender.com",
  credentials: true
}));

// OPTIONAL (remove if causing issue)
// app.options("/*", cors());

app.use(cookieParser());
app.use(express.json());

app.use("/api/gig", gigRoute);
app.use("/api/auth", authRoutes);
app.use("/api/proposal", proposalRoute);

app.get("/", (req, res) => {
  res.send("API running...");
});

module.exports = app;