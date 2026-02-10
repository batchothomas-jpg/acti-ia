export function getWednesdaysForPeriod(year, period) {
  const [startMonth, startDay] = period.start;
  const [endMonth, endDay] = period.end;

  const start = new Date(year, startMonth - 1, startDay);
  const end   = new Date(year, endMonth - 1, endDay);

  const result = [];
  const current = new Date(start);

  while (current <= end) {
    if (current.getDay() === 3) {
      result.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }

  return result;
}
