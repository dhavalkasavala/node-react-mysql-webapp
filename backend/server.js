const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();

// Security
app.use(helmet());
app.use(cors({ 
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Secure server running at http://localhost:5000");
});