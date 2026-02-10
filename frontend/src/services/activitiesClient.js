// Stockage temporaire côté front avant l'arrivée de l'IA + backend final

let cache = {};

export function getActivity(iso, group) {
  const key = `${iso}_${group}`;
  return cache[key] || null;
}

export function setActivity(iso, group, activity) {
  const key = `${iso}_${group}`;
  cache[key] = activity;
}

export function getActivitiesForExport(rows, group) {
  return rows.map(r => ({
    date: r.date,
    weekday: r.weekday,
    activity: getActivity(r.iso, group) || ""
  }));
}
