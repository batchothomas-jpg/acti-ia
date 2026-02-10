import { useEffect, useState } from "react";
import { getWeatherForDate } from "../services/weather/getWeatherForDate";

const cache = {};

export function useWeather(date) {
  const d = new Date(date);
  const key = d.toISOString().slice(0, 10);

  const [data, setData] = useState(cache[key] || null);

  useEffect(() => {
    if (cache[key]) {
      setData(cache[key]);
      return;
    }

    getWeatherForDate(d).then(res => {
      cache[key] = res;
      setData(res);
    });

  }, [key]);

  return data;
}
