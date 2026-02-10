import { resetMemory } from "../services/iaMemoryService.js";

export async function resetIaMemory(req, res) {
  try {
    // 🔐 À adapter à ton système d’auth
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Accès interdit" });
    }

    await resetMemory();
    res.json({ success: true });
  } catch (err) {
    console.error("Erreur reset mémoire IA :", err);
    res.status(500).json({ error: "Erreur reset mémoire" });
  }
}
