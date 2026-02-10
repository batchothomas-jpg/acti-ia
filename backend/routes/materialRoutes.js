import express from "express";
import {
  getMaterials,
  addMaterial,
  updateMaterial,
  deleteMaterial
} from "../controllers/materialController.js";

import { requireAuth } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, getMaterials);

router.post(
  "/",
  requireAuth,
  requireRole("admin", "directeur"),
  addMaterial
);

router.put(
  "/:id",
  requireAuth,
  requireRole("admin", "directeur"),
  updateMaterial
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  deleteMaterial
);

export default router;
