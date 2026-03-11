const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors({
  origin: "https://full-stack-to-do-dusky.vercel.app/"
}));
app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});