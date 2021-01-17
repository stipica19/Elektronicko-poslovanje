import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();

//DB config
const connection_url = process.env.MONGO_URI;

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("DB je konektovana...");
});

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`SERVER JE STARTOVAN NA PORTU ${PORT}`));
