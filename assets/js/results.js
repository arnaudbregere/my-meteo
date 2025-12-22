import { svgPath } from "./meteo-config.js";
import { getWeather } from "./meteo-api.js";

document.addEventListener("DOMContentLoaded", async () => {
  updateImageSources();
  
  // Récupérer le nom de la ville depuis l'URL
  const cityName = getCityFromURL();
  
  if (cityName) {
    await loadCityWeather(cityName);
  } else {
    console.error("Aucune ville trouvée dans l'URL");
    displayError();
  }
});

/**
 * Met à jour les sources des images SVG
 */
function updateImageSources() {
  document.querySelectorAll("img[data-file]").forEach(img => {
    img.src = svgPath + img.dataset.file;
  });
}

/**
 * Récupère le nom de la ville depuis les paramètres d'URL
 * @returns {string|null} Le nom de la ville ou null
 */
function getCityFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('meteo-search-localisation');
}

/**
 * Charge et affiche la météo de la ville
 * @param {string} cityName - Nom de la ville
 */
async function loadCityWeather(cityName) {
  try {
    console.log(`📍 Chargement météo pour: ${cityName}`);
    
    const data = await getWeather(cityName, 'FR');
      console.log('----------',data)
    if (!data || !data.main) {
      console.error("Données invalides reçues");
      displayError();
      return;
    }
    
    displayWeatherResults(data, cityName);
  } catch (err) {
    console.error("❌ Erreur lors du chargement:", err);
    displayError();
  }
}

/**
 * Affiche les résultats de la météo
 * @param {object} data - Données météo de l'API
 * @param {string} cityName - Nom de la ville
 */
function displayWeatherResults(data, cityName) {
  // Titre principal
  const resultsCityEl = document.getElementById('meteo-results-city');
  if (resultsCityEl) {
    resultsCityEl.textContent = cityName;
  }
  
  // Header avec localisation, date, température, conditions
  const locEl = document.querySelector('.meteo-h2-localisation');
  const dateEl = document.querySelector('.meteo-h2-date');
  const tempEl = document.querySelector('.meteo-h2-temperature');
  const weatherEl = document.querySelector('.meteo-h2-weather');
  
  if (locEl) locEl.textContent = data.main.city;
  if (dateEl) dateEl.textContent = data.main.date;
  if (tempEl) tempEl.textContent = `${data.main.temperature}°`;
  if (weatherEl) weatherEl.textContent = data.main.description;
  
  // Détails météo
  const windEl = document.querySelector('.meteo-wind-value');
  const rainEl = document.querySelector('.meteo-rain-value');
  const pressureEl = document.querySelector('.meteo-pressure-value');
  const humidityEl = document.querySelector('.meteo-humidity-value');
  
  // Récupérer les données supplémentaires de l'API (si disponibles)
  const windSpeed = data.wind?.speed ? `${Math.round(data.wind.speed * 3.6)} km/h` : '--';
  const cloudiness = data.clouds?.all ? `${data.clouds.all}%` : '--';
  const pressure = data.main?.pressure ? `${data.main.pressure} hPa` : '--';
  const humidity = data.main?.humidity ? `${data.main.humidity}%` : '--';
  
  if (windEl) windEl.textContent = windSpeed;
  if (rainEl) rainEl.textContent = cloudiness;
  if (pressureEl) pressureEl.textContent = pressure;
  if (humidityEl) humidityEl.textContent = humidity;
  
  console.log("✅ Résultats affichés");
}

/**
 * Affiche un message d'erreur
 */
function displayError() {
  const resultsCityEl = document.getElementById('meteo-results-city');
  if (resultsCityEl) {
    resultsCityEl.textContent = "Non trouvée";
  }
  
  const locEl = document.querySelector('.meteo-h2-localisation');
  if (locEl) {
    locEl.textContent = "Erreur";
  }
  
  console.error("❌ Impossible de charger les résultats");
}