import IAMemory from "../models/IAMemory.js";

export async function resetMemory() {
  await IAMemory.deleteMany({});
}

// Augmenter / diminuer le score
export async function updateMemory({ family, ageGroup, mechanic, delta }) {
  await IAMemory.findOneAndUpdate(
    { family, ageGroup, mechanic },
    { $inc: { score: delta } },
    { upsert: true, new: true }
  );
}

// Récupérer les mécaniques à éviter
export async function getAvoidedMechanics({ family, ageGroup, limit = 3 }) {
  const docs = await IAMemory.find({ family, ageGroup })
    .sort({ score: -1 })
    .limit(limit);

  return docs.map(d => d.mechanic);
}
