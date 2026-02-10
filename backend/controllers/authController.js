import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * 🔐 CONNEXION
 */
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    // 🔍 Comparaison bcrypt (mot de passe clair vs hash)
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    // 🔑 Génération du token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        center: user.center,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        center: user.center,
      },
    });
  } catch (err) {
    console.error("Erreur login :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

/**
 * ➕ CRÉATION UTILISATEUR (admin uniquement)
 * ⚠️ Le hash est fait AUTOMATIQUEMENT dans User.js (pre save)
 */
export async function register(req, res) {
  try {
    const { username, password, role, center } = req.body;

    if (!username || !password || !role || !center) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "Utilisateur déjà existant" });
    }

    const user = new User({
      username,
      password, // 👈 PAS DE HASH ICI
      role,
      center,
    });

    await user.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Erreur register :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
