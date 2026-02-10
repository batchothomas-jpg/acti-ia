import { getJoursFeries } from "./joursFeriesFrance.js";


/**
 * Vérifie si une date est fériée en France
 */
function isFerie(date) {
  const year = date.getFullYear();
  const feries = getJoursFeries(year);
  return feries.includes(date.toISOString().slice(0, 10));
}

/**
 * Génère les périodes de vacances scolaires
 * Zone C – années courante et futures
 * Source : données officielles (API ou JSON déjà récupéré)
 */
export function computeVacancesZoneC(rawVacances) {
  if (!Array.isArray(rawVacances)) return [];

  const periods = [];

  rawVacances.forEach(vac => {
    if (vac.zone !== "C") return;

    const start = new Date(vac.start_date);
    const end = new Date(vac.end_date);

    // 🔴 CORRECTION CLÉ :
    // on enlève le lundi de reprise
    end.setDate(end.getDate() - 1);

    const days = [];
    const cursor = new Date(start);

    while (cursor <= end) {
      const dayOfWeek = cursor.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      if (!isWeekend) {
        days.push({
          iso: cursor.toISOString().slice(0, 10),
          date: new Date(cursor),
          ferie: isFerie(cursor)
        });
      }

      cursor.setDate(cursor.getDate() + 1);
    }

    periods.push({
      id: `${vac.code}-${start.getFullYear()}`,
      label: vac.description, // ex: "Vacances d’hiver"
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
      days
    });
  });

  return periods;
}
