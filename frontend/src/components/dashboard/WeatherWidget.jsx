import { useEffect, useState } from "react";
import { getWeather16Days } from "../../services/weather/openMeteo";
import { weatherIcon } from "../../services/weather/weatherIcons";

export default function WeatherWidget() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0); // 0,1,2

  useEffect(() => {
    getWeather16Days().then(setData);
  }, []);

  if (!data) {
    return <div className="p-4 bg-white rounded border">Chargement météo…</div>;
  }

  const days = data.daily.time.map((date, i) => ({
    date,
    min: data.daily.temperature_2m_min[i],
    max: data.daily.temperature_2m_max[i],
    code: data.daily.weathercode[i],
  }));

  const pages = [
    days.slice(0, 7),
    days.slice(7, 14),
    days.slice(14, 21),
  ].filter(p => p.length > 0);

  const current = pages[page];

  return (
    <div className="p-4 bg-white rounded border shadow space-y-2">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          ◀
        </button>

        <h2 className="text-sm font-semibold">
          📍 Aulnay-sous-Bois — Semaine {page + 1}
        </h2>

        <button
          onClick={() => setPage(p => Math.min(p + 1, pages.length - 1))}
          disabled={page === pages.length - 1}
        >
          ▶
        </button>
      </div>

      {current.map(day => {
        const label = new Date(day.date).toLocaleDateString("fr-FR", {
          weekday: "long",
        });

        return (
          <div
            key={day.date}
            className="flex justify-between text-sm border-b last:border-b-0 pb-1"
          >
            <span className="capitalize">{label}</span>
            <span>
              {weatherIcon(day.code)}{" "}
              {Math.round(day.min)}° / {Math.round(day.max)}°
            </span>
          </div>
        );
      })}
    </div>
  );
}
