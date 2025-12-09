import { apiKey } from "./meteo-config.js";

export async function getWeather(city, country) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&lang=fr&APPID=${apiKey}`
    );

    if (!res.ok) {
      throw new Error("Ville introuvable");
    }

    const data = await res.json();
    return data;

  } catch (err) {
    console.error("Erreur API :", err.message);
    return null; // ou return; ?? 
  }
}


