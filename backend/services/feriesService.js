import axios from "axios";

/**
 * Charge les fériés France métropolitaine pour année courante + suivante
 */
export async function chargerFeries() {
  const year = new Date().getFullYear();
  const years = [year, year + 1];

  const feries = new Set();

  for (const y of years) {
    const url = `https://calendrier.api.gouv.fr/jours-feries/metropole/${y}.json`;
    const { data } = await axios.get(url);

    Object.keys(data).forEach(d => feries.add(d));
  }

  return feries;
}

let feriesCache = null;

export function isFerie(iso) {
  return feriesCache && feriesCache.has(iso);
}

/**
 * À appeler au démarrage serveur pour remplir le cache
 */
export async function initFeries() {
  feriesCache = await chargerFeries();
}
