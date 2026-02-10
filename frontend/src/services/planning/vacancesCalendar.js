export const VACANCES_ZONE_C = [
  { id: "hiver_2026", label: "Vacances d'hiver 2026", start: "2026-02-14", end: "2026-03-02" },
  { id: "printemps_2026", label: "Vacances de printemps 2026", start: "2026-04-18", end: "2026-05-05" },
  { id: "ete_2026", label: "Vacances d'été 2026", start: "2026-07-04", end: "2026-09-01" },
];

const HOLIDAYS = [
  { date: "2026-05-01", name: "Fête du Travail" },
  { date: "2026-05-08", name: "Victoire 1945" },
  { date: "2026-05-14", name: "Ascension" },
];

export function checkHoliday(day) {
  const d = day.toISOString().split("T")[0];
  const h = HOLIDAYS.find(h => h.date === d);
  return {
    holiday: !!h,
    name: h?.name || null,
  };
}

// B = commence au premier lundi
function getFirstMonday(d) {
  const date = new Date(d);
  const day = date.getDay();
  if (day === 1) return date;
  const diff = (8 - day) % 7;
  date.setDate(date.getDate() + diff);
  return date;
}

// Génère uniquement des semaines ACM (L→V) selon règle B
export function computeVacancesWeeks({ start, end }) {
  const startDate = getFirstMonday(start);
  const endDate = new Date(end);

  const weeks = [];
  let current = new Date(startDate);

  while (current <= endDate) {
    let week = [];

    for (let i = 0; i < 5; i++) {
      const day = new Date(current);

      if (day > endDate) break;

      const dow = day.getDay();
      if (dow >= 1 && dow <= 5) {
        const h = checkHoliday(day);
        week.push({
          date: new Date(day),
          holiday: h.holiday,
          holidayName: h.name,
          morning: null,
          afternoon: null,
        });
      }

      current.setDate(current.getDate() + 1);
    }

    if (week.length > 0) weeks.push(week);

    // week-end skip
    if (current.getDay() === 6) current.setDate(current.getDate() + 2);
  }

  return weeks;
}
