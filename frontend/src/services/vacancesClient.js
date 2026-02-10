export async function fetchVacances() {
  const res = await fetch("http://localhost:4000/api/vacances");
  const data = await res.json();

  return data.map(v => ({
    id: v.id,
    nom: v.label,
    start: new Date(v.start),
    end: new Date(v.end),
    days: buildDays(v.start, v.end)
  }));
}

function buildDays(start, end) {
  const days = [];
  let d = new Date(start);

  while (d <= new Date(end)) {
    const weekday = d.getDay(); // 0 = dim
    if (weekday >= 1 && weekday <= 5) {
      days.push({
        iso: d.toISOString().slice(0, 10),
        date: new Date(d),
        weekday,
        ferie: false,
        activity: ""
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}
