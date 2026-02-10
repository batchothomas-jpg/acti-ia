import express from "express";
import {
  getActivities,
  addActivity,
  deleteActivity,
} from "../controllers/activitiesController.js";

import { requireAuth } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// 🔒 toutes les routes protégées
router.get("/", requireAuth, getActivities);

router.post(
  "/",
  requireAuth,
  requireRole("admin", "animateur", "directeur"),
  addActivity
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("admin", "directeur"),
  deleteActivity
);

export default router;
