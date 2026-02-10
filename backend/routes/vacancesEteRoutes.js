import { Router } from "express";
import { computeVacancesEte } from "../services/computeVacancesEte.js";
import { saveEte, loadEte } from "../services/storageVacancesEte.js";

const router = Router();

router.post("/", (req, res) => {
  const { start, end } = req.body;
  saveEte(start, end);
  res.json({ ok: true });
});

router.get("/", (_, res) => {
  const cfg = loadEte();
  if (!cfg) return res.json(null);

  const data = computeVacancesEte(cfg.start, cfg.end);
  res.json(data);
});

export default router;
