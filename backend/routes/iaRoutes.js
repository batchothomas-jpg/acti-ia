import express from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { generateActivities, saveActivity, getActivities } from "../controllers/iaController.js";
import { iaFeedback } from "../controllers/iaFeedbackController.js";
import { resetIaMemory } from "../controllers/iaAdminController.js";

const router = express.Router();

// 🔐 ADMIN
router.post("/reset-memory", requireAuth, resetIaMemory);

// 🤖 IA
router.post("/generate", requireAuth, generateActivities);
router.post("/save", requireAuth, saveActivity);
router.get("/", requireAuth, getActivities);

// 🧠 feedback
router.post("/feedback", requireAuth, iaFeedback);

export default router;
