export function getSchoolPeriod(date) {
  const month = date.getMonth() + 1; // 1-12

  if (month >= 9) return 1;   // Septembre
  if (month >= 11) return 2;  // Novembre
  if (month >= 1) return 3;   // Janvier
  if (month >= 3) return 4;   // Mars
  if (month >= 5) return 5;   // Mai

  return 5; // par défaut fin d'année
}
