// Service météo - Gestion de l'API OpenWeatherMap

import { API_KEY } from "../config/weather-config.js";
import { OPENWEATHER_API } from "../config/api-endpoints.js";
//import { formatDate } from "../ui/renderers/shared-renderer.js"; TODO : Create file next step
import { formatDate } from "../utils/utils.js";

// Liste des villes disponibles pour suggestions aléatoires
const AVAILABLE_CITIES = [
  { name: "Paris", lat: 48.8566, lon: 2.3522, country: "FR" },
  { name: "Lyon", lat: 45.7640, lon: 4.8357, country: "FR" },
  { name: "Marseille", lat: 43.2965, lon: 5.3698, country: "FR" },
  { name: "Toulouse", lat: 43.6047, lon: 1.4442, country: "FR" },
  { name: "Nice", lat: 43.7102, lon: 7.2620, country: "FR" },
  { name: "Nantes", lat: 47.2184, lon: -1.5536, country: "FR" },
  { name: "Strasbourg", lat: 48.5734, lon: 7.7521, country: "FR" },
  { name: "Montpellier", lat: 43.6108, lon: 3.8767, country: "FR" },
  { name: "Bordeaux", lat: 44.8378, lon: -0.5792, country: "FR" },
  { name: "Lille", lat: 50.6292, lon: 3.0573, country: "FR" },
  { name: "Rennes", lat: 48.1173, lon: -1.6778, country: "FR" },
  { name: "Reims", lat: 49.2583, lon: 4.0347, country: "FR" },
  { name: "Nancy", lat: 48.6921, lon: 6.1844, country: "FR" },
  { name: "Grenoble", lat: 45.1885, lon: 5.7245, country: "FR" },
  { name: "Dijon", lat: 47.3220, lon: 5.0409, country: "FR" },
  { name: "Angers", lat: 47.4829, lon: -0.5531, country: "FR" },
  { name: "Saint-Étienne", lat: 42.3976, lon: 4.3898, country: "FR" },
  { name: "Le Havre", lat: 49.4944, lon: 0.1079, country: "FR" },
];

// Mapping des codes icônes OpenWeatherMap vers fichiers SVG locaux
const WEATHER_ICON_MAP = {
  "01d": "sun.svg",
  "01n": "sun.svg",
  "02d": "cloud.svg",
  "02n": "cloud.svg",
  "03d": "cloud.svg",
  "03n": "cloud.svg",
  "04d": "cloud.svg",
  "04n": "cloud.svg",
  "09d": "rain.svg",
  "09n": "rain.svg",
  "10d": "rain.svg",
  "10n": "rain.svg",
  "11d": "rain.svg",
  "11n": "rain.svg",
  "13d": "snow.svg",
  "13n": "snow.svg",
  "50d": "cloud.svg",
  "50n": "cloud.svg",
};

// Transforme données API OpenWeatherMap 
const transformWeatherData = (data, cityName) => {
  if (!data?.weather?.[0] || !data?.main) return null;

  const weather = data.weather[0];
  return {
    name: cityName,
    temperature: Math.round(data.main.temp),
    description: weather.description,
    icon: WEATHER_ICON_MAP[weather.icon] || "cloud.svg",
    humidity: data.main.humidity,
  };
};

// Transforme données pour page résultats (données complètes)
const transformMainWeatherData = (data) => {
  if (!data?.weather?.[0] || !data?.main) return null;

  const weather = data.weather[0];
  return {
    main: {
      city: data.name,
      date: formatDate(new Date()),
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      description: weather.description,
      icon: WEATHER_ICON_MAP[weather.icon] || "cloud.svg",
      iconCode: weather.icon,
    },
    wind: data.wind,
    clouds: data.clouds,
    pressure: data.main.pressure,
  };
};

// Génère données météo mock (fallback si API down)
const getMockWeatherData = (cities) => {
  const descriptions = ["Ensoleillé", "Nuageux", "Pluvieux", "Neigeux"];
  const icons = ["sun.svg", "cloud.svg", "rain.svg", "snow.svg"];

  return cities.map(city => ({
    name: city.name,
    temperature: Math.floor(Math.random() * 30) + 5,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    icon: icons[Math.floor(Math.random() * icons.length)],
    humidity: Math.floor(Math.random() * 40) + 40,
  }));
};

// Récupère météo pour plusieurs villes en parallèle
export const getWeatherBatch = async (cities, lang = "fr") => {
  try {
    // Promise.all parallélise les requêtes: plus rapide et gère les erreurs individuelles
    const promises = cities.map(city => {
      const url = `${OPENWEATHER_API.WEATHER}?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&lang=${lang}&units=metric`;

      return fetch(url)
        .then(res => {
          if (!res.ok) throw new Error(`API OpenWeather: ${res.status}`);
          return res.json();
        })
        .then(data => transformWeatherData(data, city.name))
        .catch(err => {
          console.error(`Erreur ${city.name}: ${err.message}`);
          return null;
        });
    });

    const results = await Promise.all(promises);
    const filtered = results.filter(Boolean);

    // Si au moins 1 ville OK, retourner résultats; sinon fallback mock
    return filtered.length > 0 ? filtered : getMockWeatherData(cities);
  } catch (err) {
    console.error("Erreur batch météo:", err.message);
    return getMockWeatherData(cities);
  }
};

// Sélectionne N villes aléatoires dans la liste disponible
export const getRandomCities = (count = 4) => {
  const shuffled = [...AVAILABLE_CITIES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, AVAILABLE_CITIES.length));
  console.log("Villes aléatoires:", selected.map(c => c.name).join(", "));
  return selected;
};

// Récupère météo pour des coordonnées spécifiques (lat/lon)
export const getWeatherByCoordinates = async (lat, lon, cityName) => {
  try {
    const url = `${OPENWEATHER_API.WEATHER}?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Erreur OpenWeather: ${res.status}`);
    }

    const data = await res.json();
    data.name = cityName;

    return transformMainWeatherData(data);
  } catch (err) {
    console.error("Erreur API météo:", err.message);
    return null;
  }
};