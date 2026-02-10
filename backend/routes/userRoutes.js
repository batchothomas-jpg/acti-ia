import express from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

import { getUsers, changePassword } from "../controllers/userController.js";
import { register } from "../controllers/authController.js";

const router = express.Router();

/* 👑 Liste des utilisateurs (admin uniquement) */
router.get(
  "/",
  requireAuth,
  requireRole("admin"),
  getUsers
);

/* ➕ Création utilisateur (admin uniquement) */
router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  register
);

/* 🔐 Changement mot de passe (utilisateur connecté) */
router.post(
  "/change-password",
  requireAuth,
  changePassword
);

export default router;
