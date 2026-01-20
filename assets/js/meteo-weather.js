import { apiKey } from "./meteo-config.js";
import { formatDate } from "./utils/utils.js";

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

const WEATHER_ICON_MAP = {
  "01d": "sun.svg", "01n": "sun.svg",
  "02d": "cloud.svg", "02n": "cloud.svg",
  "03d": "cloud.svg", "03n": "cloud.svg",
  "04d": "cloud.svg", "04n": "cloud.svg",
  "09d": "rain.svg", "09n": "rain.svg",
  "10d": "rain.svg", "10n": "rain.svg",
  "11d": "rain.svg", "11n": "rain.svg",
  "13d": "snow.svg", "13n": "snow.svg",
  "50d": "cloud.svg", "50n": "cloud.svg",
};

function transformWeatherData(data, cityName) {
  if (!data || !data.weather || !data.main) return null;
  
  const weather = data.weather[0];
  return {
    name: cityName,
    temperature: Math.round(data.main.temp),
    description: weather.description,
    icon: WEATHER_ICON_MAP[weather.icon] || "cloud.svg",
    humidity: data.main.humidity,
  };
}

function transformMainWeatherData(data) {
  if (!data || !data.weather || !data.main) return null;
  
  const weather = data.weather[0];
  return {
    main: {
      city: data.name,
      date: formatDate(new Date()),
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      description: weather.description,
      icon: WEATHER_ICON_MAP[weather.icon] || "cloud.svg",
      iconCode: weather.icon  
    },
    wind: data.wind,
    clouds: data.clouds,
    pressure: data.main.pressure,
  };
}

function getMockWeatherData(cities) {
  console.log("Utilisation des données MOCK (batch)");
  return cities.map(city => ({
    name: city.name,
    temperature: Math.floor(Math.random() * 30) + 5,
    description: ["Ensoleillé", "Nuageux", "Pluvieux", "Neigeux"][Math.floor(Math.random() * 4)],
    icon: ["sun.svg", "cloud.svg", "rain.svg", "snow.svg"][Math.floor(Math.random() * 4)],
    humidity: Math.floor(Math.random() * 40) + 40,
  }));
}

export async function getWeatherBatch(cities, lang = "fr") {
  try {
    const promises = cities.map(city => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&lang=${lang}&units=metric`;
      
      return fetch(url)
        .then(res => {
          if (!res.ok) throw new Error(`API Error: ${res.status}`);
          return res.json();
        })
        .then(data => transformWeatherData(data, city.name))
        .catch(err => {
          console.error(`Erreur pour ${city.name}:`, err);
          return null;
        });
    });

    const results = await Promise.all(promises);
    const filtered = results.filter(Boolean);
    console.log(" Résultats filtrés:", filtered);
    
    return filtered;
  } catch (err) {
    console.error(" Erreur batch météo:", err);
    return getMockWeatherData(cities);
  }
}

export function getRandomCities(count = 4) {
  const shuffled = [...AVAILABLE_CITIES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  console.log("Villes aléatoires sélectionnées:", selected.map(c => c.name));
  return selected;
}

/**
 * Récupère la météo pour des coordonnées (lat/lon)
 * Utilisé pour la recherche de ville
 */
export async function getWeatherByCoordinates(lat, lon, cityName) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`HTTP ${res.status}: Impossible de récupérer la météo`);

    const data = await res.json();
    
    // Utiliser le nom de la ville passé en paramètre (depuis Nominatim)
    // Cela garantit cohérence entre la recherche et le résultat
    data.name = cityName;
    
    return transformMainWeatherData(data);
  } catch (err) {
    console.error("Erreur API météo:", err.message);
    return null;
  }
}