import fetch from "node-fetch";

const ZONE = "C";
const DATASET =
  "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records";

export async function getVacancesZoneC() {
  const now = new Date();
  const currentYear = now.getFullYear();

  const url =
    `${DATASET}?limit=100&refine=location==${ZONE}&order_by=start_date`;

  const res = await fetch(url);
  const json = await res.json();

  const records = json.results || [];

  const cleaned = records
    .filter(r => r.start_date && r.end_date)
    .map(r => ({
      id: r.recordid,
      label: r.description, // Exemple: "Vacances d'hiver"
      start: new Date(r.start_date),
      end: new Date(r.end_date),
      zone: r.location
    }))
    .filter(v => v.start.getFullYear() >= currentYear - 1);

  return cleaned;
}
