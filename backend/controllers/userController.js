import User from "../models/User.js";
import bcrypt from "bcryptjs";

export async function getUsers(req, res) {
  const users = await User.find().select("-password");
  res.json(users);
}

export async function changePassword(req, res) {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(userId);

  const isValid = await bcrypt.compare(oldPassword, user.password);
  if (!isValid) {
    return res.status(401).json({ error: "Ancien mot de passe incorrect" });
  }

  user.password = newPassword; // hash auto
  await user.save();

  res.json({ success: true });
}
