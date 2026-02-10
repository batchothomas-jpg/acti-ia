export function getSchoolYear(date = new Date()) {
  const y = date.getFullYear();
  const m = date.getMonth();
  return (m >= 8) ? `${y}-${y + 1}` : `${y - 1}-${y}`;
}
