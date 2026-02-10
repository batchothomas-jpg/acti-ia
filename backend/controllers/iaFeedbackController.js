import { updateMemory } from "../services/iaMemoryService.js";

export async function iaFeedback(req, res) {
  try {
    const { family, ageGroup, mechanic, delta } = req.body;

    if (!family || !ageGroup || !mechanic || typeof delta !== "number") {
      return res.status(400).json({ error: "Paramètres invalides" });
    }

    await updateMemory({
      family,
      ageGroup,
      mechanic,
      delta
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Erreur feedback IA :", err);
    res.status(500).json({ error: "Erreur feedback IA" });
  }
}
