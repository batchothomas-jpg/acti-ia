export function getWednesdaysBetween(start, end) {
  const result = [];
  const current = new Date(start);

  while (current <= end) {
    if (current.getDay() === 3) { // mercredi = 3
      result.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  return result;
}

export function formatDate(date) {
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}
