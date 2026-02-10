import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* 🔒 Vérification token */
export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 RÉCUPÉRATION DU USER COMPLET EN BDD
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Utilisateur introuvable" });
    }

    // ✅ user COMPLET : role, center, etc.
    req.user = user;

    next();
  } catch (err) {
    console.error("Erreur auth:", err);
    return res.status(401).json({ error: "Token invalide" });
  }
}

/* 🎭 Vérification rôle */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Accès refusé" });
    }
    next();
  };
}
