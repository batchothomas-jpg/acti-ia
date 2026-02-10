export function getACMState(date = new Date()) {
  const m = date.getMonth() + 1;
  if (m === 7 || m === 8) return "summer";
  return "school";
}
