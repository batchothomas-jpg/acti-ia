import { Router } from "express";
import { computeVacancesZoneC } from "../services/computeVacancesZoneC.js";

const router = Router();

router.get("/", (_, res) => {
  const data = computeVacancesZoneC();
  res.json(data);
});

export default router;
