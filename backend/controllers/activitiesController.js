import Activity from "../models/Activity.js";

/* GET */
export async function getActivities(req, res) {
  const filter = {};

  // 👑 admin voit tout
  if (req.user.role !== "admin") {
    filter.center = req.user.center;
  }

  const activities = await Activity
    .find(filter)
    .sort({ createdAt: -1 });

  res.json(activities);
}

/* POST */
export async function addActivity(req, res) {
  try {
    const activity = await Activity.create({
      ...req.body,

      // 🔒 centre imposé par le backend
      center: req.user.center,
    });

    res.json(activity);
  } catch (err) {
    console.error("Erreur création activité :", err);
    res.status(500).json({ error: "Erreur création activité" });
  }
}

/* DELETE */
export async function deleteActivity(req, res) {
  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    return res.sendStatus(404);
  }

  // 🔐 protection centre
  if (
    req.user.role !== "admin" &&
    activity.center !== req.user.center
  ) {
    return res.sendStatus(403);
  }

  await activity.deleteOne();
  res.json({ success: true });
}
