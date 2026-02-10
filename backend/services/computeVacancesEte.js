export function computeVacancesEte(start, end) {
  const days = [];
  let d = new Date(start);

  while (d <= new Date(end)) {
    const weekday = d.getDay();
    const ouvrable = weekday >= 1 && weekday <= 5;

    days.push({
      iso: d.toISOString().slice(0, 10),
      ouvrable
    });

    d.setDate(d.getDate() + 1);
  }

  return {
    id: "ete",
    label: "Vacances d'été",
    start,
    end,
    days
  };
}
