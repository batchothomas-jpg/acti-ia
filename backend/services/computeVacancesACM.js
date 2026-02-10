import { france } from "calendrier-scolaire-france";
import joursFeries from "jours-feries-france";

// === CONFIG ===
const ZONE = "C";
const NOW = new Date();
const YEAR = NOW.getMonth() >= 7 ? NOW.getFullYear() : NOW.getFullYear() - 1;
const NEXT = YEAR + 1;

function normaliserNom(label) {
  if (!label) return "";
  label = label.toLowerCase();

  if (label.includes("toussaint")) return "Vacances de la Toussaint";
  if (label.includes("noël") || label.includes("noel")) return "Vacances de Noël";
  if (label.includes("hiver")) return "Vacances d'Hiver";
  if (label.includes("printemps") || label.includes("paques")) return "Vacances de Printemps";
  if (label.includes("été") || label.includes("ete")) return "Vacances d'Été";

  return label;
}

export function computeVacancesACM() {
  const periods = [];

  const map = france.getHolidaysForYear(YEAR)[ZONE];
  const mapNext = france.getHolidaysForYear(NEXT)[ZONE];

  const sources = [...map, ...mapNext].filter(v => v?.description && v?.start && v?.end);

  const hash = new Set();

  for (const v of sources) {
    const name = normaliserNom(v.description);
    if (!name) continue;

    const key = `${name}-${v.start}-${v.end}`;
    if (hash.has(key)) continue;
    hash.add(key);

    const start = new Date(v.start);
    const end = new Date(v.end);

    periods.push({
      id: key,
      name,
      start,
      end,
      days: buildDays(start, end)
    });
  }

  return periods;
}

function buildDays(start, end) {
  const jours = [];
  let d = new Date(start);

  while (d <= end) {
    const iso = d.toISOString().split("T")[0];
    const w = d.getDay();

    const isFerier = !!joursFeries.getJourFerie(d.getFullYear(), d.getMonth() + 1, d.getDate());
    const isWeekend = (w === 0 || w === 6);

    jours.push({
      date: new Date(d),
      iso,
      ouvrable: !isWeekend && !isFerier,
      ferier: isFerier
    });

    d.setDate(d.getDate() + 1);
  }

  return jours;
}
