import { svgPath } from "./meteo-config.js";
import { getWeather, getWeatherBatch, getRandomCities } from "./meteo-api.js";

document.addEventListener("DOMContentLoaded", () => {
  updateImageSources();
  initApp();
});

function updateImageSources() {
  document.querySelectorAll("img[data-file]").forEach(img => {
    img.src = svgPath + img.dataset.file;
  });
}

async function initApp() {
  try {
    await loadMainWeather("Paris");
    await loadRandomCitiesWeather();
  } catch (err) {
    console.error("Erreur initialisation:", err);
  }
}

/**
 * Charge la météo principale (Paris)
 */
async function loadMainWeather(city) {
  try {
    console.log(`📍 Chargement météo pour ${city}...`);
    
    const data = await getWeather(city, 'FR');
    console.log("Données reçues:", data);
    
    if (!data || !data.main) {
      console.error("Données invalides");
      return;
    }
    
    // Mettre à jour le DOM
    const locEl = document.querySelector('.meteo-h1-localisation');
    const dateEl = document.querySelector('.meteo-h1-date');
    const tempEl = document.querySelector('.meteo-h1-temperature');
    
    if (locEl) locEl.textContent = data.main.city;
    if (dateEl) dateEl.textContent = data.main.date;
    if (tempEl) tempEl.textContent = `${data.main.temperature}°C`;
    
    console.log("✅ Météo principale affichée");
  } catch (err) {
    console.error("❌ Erreur météo principale:", err);
  }
}

/**
 * Charge les villes aléatoires avec leurs données météo
 */
async function loadRandomCitiesWeather() {
  try {
    console.log("🎲 Chargement villes aléatoires...");
    
    // Sélectionner 4 villes aléatoires
    const randomCities = getRandomCities(4);
    console.log("Villes:", randomCities.map(c => c.name).join(", "));
    
    // Récupérer les données météo
    const weatherData = await getWeatherBatch(randomCities, 'fr');
    console.log(`${weatherData.length} données reçues`, weatherData);
    
    // Afficher les données
    displayCitiesWeather(weatherData);
  } catch (err) {
    console.error("❌ Erreur villes aléatoires:", err);
  }
}

/**
 * Affiche les données météo dans la liste
 */
function displayCitiesWeather(weatherData) {
  const listItems = document.querySelectorAll('.meteo-list-random-list li');
  console.log(`🎨 Affichage de ${Math.min(weatherData.length, listItems.length)} villes`);
  
  listItems.forEach((item, index) => {
    if (!weatherData[index]) return;
    
    const city = weatherData[index];
    console.log(`  ${index}: ${city.name} - ${city.temperature}° - ${city.icon}`);
    
    // Nom de la ville
    const nameEl = item.querySelector('.meteo-city span:first-child');
    if (nameEl) nameEl.textContent = city.name;
    
    // Température
    const tempEl = item.querySelector('.meteo-temperature');
    if (tempEl) tempEl.textContent = `${city.temperature}°C`;
    
    // Icône météo
    const iconEl = item.querySelector('.meteo-weather img');
    if (iconEl) {
      iconEl.src = `${svgPath}${city.icon}`;
      iconEl.setAttribute('alt', city.description);
    }
    
    // Description
    const descEl = item.querySelector('.meteo-weather p');
    if (descEl) descEl.textContent = city.description;
  });
  
  console.log("✅ Villes affichées");
}