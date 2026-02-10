const KEY = "planning_vacances";

export function saveVacances(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function loadVacances() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;

  const parsed = JSON.parse(raw);

  parsed.weeks = parsed.weeks.map(week =>
    week.map(day => ({
      ...day,
      date: new Date(day.date)
    }))
  );

  return parsed;
}

export function resetVacances() {
  localStorage.removeItem(KEY);
}
