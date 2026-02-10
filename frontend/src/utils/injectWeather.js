export function injectWeatherIntoPeriods(periods, forecast) {
  return periods.map((p) => ({
    ...p,
    semaines: p.semaines.map((week) =>
      week.map((day) => {
        const w = forecast.find(
          (f) =>
            f.date.toDateString() === new Date(day.date).toDateString()
        );

        return {
          ...day,
          meteo: w ? w.weather : null,
          pluie: w ? w.rain : 0,
          neige: w ? w.snow : 0,
          icon: w ? w.icon : null,
        };
      })
    ),
  }));
}
