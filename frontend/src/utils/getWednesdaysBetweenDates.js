/**
 * Retourne tous les mercredis entre deux dates incluses
 * @param {string} startDate - format YYYY-MM-DD
 * @param {string} endDate - format YYYY-MM-DD
 * @returns {string[]} tableau de dates YYYY-MM-DD
 */
export function getWednesdaysBetweenDates(startDate, endDate) {
  if (!startDate || !endDate) return [];

  const start = new Date(startDate);
  const end = new Date(endDate);

  // sécurité
  if (start > end) return [];

  const wednesdays = [];

  // on part du début
  const current = new Date(start);

  // avancer jusqu'au premier mercredi
  while (current.getDay() !== 3) {
    current.setDate(current.getDate() + 1);
  }

  // parcourir tous les mercredis
  while (current <= end) {
    const iso = current.toISOString().split("T")[0];
    wednesdays.push(iso);
    current.setDate(current.getDate() + 7);
  }

  return wednesdays;
}
