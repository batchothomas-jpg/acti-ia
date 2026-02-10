import { VACANCES_ZONE_C } from "./vacancesData.js";

const FERIERS = [
  "01-01", "01-05", "08-05", "14-07", "15-08", "01-11", "11-11", "25-12"
];

function isFerier(date) {
  const key = date.toISOString().slice(5, 10);
  return FERIERS.includes(key);
}

export function computeVacances() {
  return VACANCES_ZONE_C.map(v => {
    const start = new Date(v.start);
    const end = new Date(v.end);

    const days = [];
    let t = new Date(start);

    while (t <= end) {
      const w = t.getDay();
      const iso = t.toISOString().split("T")[0];

      const weekend = (w === 0 || w === 6);
      const ferie = isFerier(t);

      days.push({
        iso,
        date: new Date(t),
        ouvrable: !weekend && !ferie,
        ferie
      });

      t.setDate(t.getDate() + 1);
    }

    return {
      id: `${v.name}-${v.start}`,
      name: v.name,
      start,
      end,
      days
    };
  });
}
