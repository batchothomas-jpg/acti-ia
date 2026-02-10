import Material from "../models/Material.js";

// GET
export async function getMaterials(req, res) {
  const filter = {};

  // 👑 admin voit tout
  if (req.user.role !== "admin") {
    filter.center = req.user.center;
  }

  const materials = await Material
    .find(filter)
    .sort({ category: 1, name: 1 });

  res.json(materials);
}


// POST
export async function addMaterial(req, res) {
  const { name, category, quantity } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Nom requis" });
  }

  const material = await Material.create({
    name,
    category,
    quantity: quantity || 1,

    // 🔒 centre automatique
    center: req.user.center,
  });

  res.json(material);
}


// PUT
// PUT sécurisé
export async function updateMaterial(req, res) {
  const material = await Material.findById(req.params.id);

  if (!material) return res.sendStatus(404);

  if (req.user.role !== "admin" && material.center !== req.user.center) {
    return res.sendStatus(403);
  }

  Object.assign(material, req.body);
  await material.save();
  res.json(material);
}


// DELETE
export async function deleteMaterial(req, res) {
  await Material.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}
