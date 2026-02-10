const KEY = "acm_planning";

function loadAll() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return {};
  try { return JSON.parse(raw); }
  catch { return {}; }
}

function saveAll(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function loadACM(year, group, period) {
  const all = loadAll();
  return all?.[year]?.[group]?.[period] || {};
}

export function saveACM(year, group, period, data) {
  const all = loadAll();

  if (!all[year]) all[year] = {};
  if (!all[year][group]) all[year][group] = {};

  all[year][group][period] = data;
  saveAll(all);
}
