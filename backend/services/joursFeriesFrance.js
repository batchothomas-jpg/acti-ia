/**
 * Jours fériés nationaux français
 * Calculés dynamiquement (sans dépendance)
 */

function easterDate(year) {
  const f = Math.floor;
  const G = year % 19;
  const C = f(year / 100);
  const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
  const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
  const J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7;
  const L = I - J;
  const month = 3 + f((L + 40) / 44);
  const day = L + 28 - 31 * f(month / 4);
  return new Date(year, month - 1, day);
}

export function getJoursFeries(year) {
  const easter = easterDate(year);

  const feries = [
    `${year}-01-01`, // Jour de l'an
    `${year}-05-01`, // Fête du travail
    `${year}-05-08`, // Victoire 1945
    `${year}-07-14`, // Fête nationale
    `${year}-08-15`, // Assomption
    `${year}-11-01`, // Toussaint
    `${year}-11-11`, // Armistice
    `${year}-12-25`, // Noël
  ];

  // Fériés mobiles
  const toISO = d => d.toISOString().slice(0, 10);

  feries.push(toISO(new Date(easter.getTime() + 1 * 86400000)));   // Lundi de Pâques
  feries.push(toISO(new Date(easter.getTime() + 39 * 86400000)));  // Ascension
  feries.push(toISO(new Date(easter.getTime() + 50 * 86400000)));  // Lundi de Pentecôte

  return feries;
}
