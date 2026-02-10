export async function getWeather16Days() {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=48.9381" +
    "&longitude=2.494" +
    "&daily=weathercode,temperature_2m_max,temperature_2m_min" +
    "&timezone=Europe/Paris" +
    "&forecast_days=16";

  const res = await fetch(url);
  if (!res.ok) throw new Error("Erreur météo");

  return res.json();
}
