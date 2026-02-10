// utils/iaMemory.js

const memory = {
  sportif: {},
  manuelle: {},
  "jeux de société": {}
};

// Enregistre une mécanique
export function rememberMechanic(family, mechanic) {
  if (!mechanic) return;

  const key = family.toLowerCase();
  memory[key][mechanic] = (memory[key][mechanic] || 0) + 1;
}

// Récupère les mécaniques trop utilisées
export function getFrequentMechanics(family, limit = 3) {
  const key = family.toLowerCase();
  const data = memory[key] || {};

  return Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name]) => name);
}
