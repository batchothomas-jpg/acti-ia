export function getNextVacationsPeriod() {
  const today = new Date()
  const year = today.getFullYear()

  const periods = [
    { name: "Vacances d'hiver",   start: new Date(year, 1, 22), end: new Date(year, 2, 7) },
    { name: "Vacances de printemps", start: new Date(year, 3, 12), end: new Date(year, 3, 28) },
    { name: "Vacances d'été", start: new Date(year, 6, 6), end: new Date(year, 7, 31) },
    { name: "Vacances de la Toussaint", start: new Date(year, 9, 19), end: new Date(year, 10, 3) },
    { name: "Vacances de Noël", start: new Date(year, 11, 20), end: new Date(year+1, 0, 5) },
  ]

  for (let p of periods) {
    if (today < p.end) return p
  }

  return periods[0]
}
