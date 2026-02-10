// JOURS FÉRIÉS FIXES FRANCE
export const FIXED_HOLIDAYS = [
  { month: 0,  day: 1,  name: "Jour de l'An" },
  { month: 4,  day: 1,  name: "Fête du Travail" },
  { month: 4,  day: 8,  name: "Victoire 1945" },
  { month: 6,  day: 14, name: "Fête Nationale" },
  { month: 7,  day: 15, name: "Assomption" },
  { month: 10, day: 1,  name: "La Toussaint" },
  { month: 10, day: 11, name: "Armistice" },
  { month: 11, day: 25, name: "Noël" }
];

// JOURS FÉRIÉS MOBILES (PÂQUES, ASCENSION, PENTECÔTE)
export function getEaster(year) {
  const f = Math.floor,
    G = year % 19,
    C = f(year / 100),
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
  const day = I - ((year + f(year / 4) + I + 2 - C + f(C / 4)) % 7) + 28;
  const month = 2 + f(day / 31);
  return new Date(year, month, day % 31 + 1);
}

export function getMobileHolidays(year) {
  const easter = getEaster(year);
  return [
    { date: easter,   name: "Pâques" },
    { date: new Date(easter.getTime() + 39 * 86400000), name: "Ascension" },
    { date: new Date(easter.getTime() + 50 * 86400000), name: "Pentecôte" }
  ];
}

export function isHoliday(date) {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  // fixes
  for (const h of FIXED_HOLIDAYS) {
    if (h.month === m && h.day === d) return { holiday: true, name: h.name };
  }

  // mobiles
  for (const h of getMobileHolidays(y)) {
    if (
      h.date.getFullYear() === y &&
      h.date.getMonth() === m &&
      h.date.getDate() === d
    ) {
      return { holiday: true, name: h.name };
    }
  }

  return { holiday: false };
}
