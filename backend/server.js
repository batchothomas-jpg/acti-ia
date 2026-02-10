import dotenv from "dotenv";
dotenv.config();

import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import vacancesEteRoutes from "./routes/vacancesEteRoutes.js";
import vacancesRoutes from "./routes/vacancesRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import iaRoutes from "./routes/iaRoutes.js";
import activitiesRoutes from "./routes/activitiesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import User from "./models/User.js";

const app = express();

/* 🔐 MIDDLEWARES */
app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());

/* 📦 ROUTES */
app.use("/api/vacances", vacancesRoutes);
app.use("/api/vacances-ete", vacancesEteRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/ia", iaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/users", userRoutes);

/* 🚀 DÉMARRAGE */
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connecté");

    // 🔒 Admin auto si besoin (optionnel)
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      console.log("ℹ️ Aucun admin trouvé");
    }

    app.listen(3001, () => {
      console.log("🚀 Backend lancé sur http://localhost:3001");
    });
  } catch (err) {
    console.error("❌ Erreur MongoDB :", err);
    process.exit(1);
  }
}

startServer();
