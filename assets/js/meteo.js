import { svgPath } from "./meteo-config.js";
import { getWeather, getWeatherBatch, getRandomCities } from "./meteo-api.js";
import { initSwipeGestures } from "./swipe.js";

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
    
    // Initialiser les gestes de swipe
    const listItems = document.querySelectorAll('.meteo-list-random-list li');
    await initSwipeGestures(listItems);
  } catch (err) {
    console.error("Erreur initialisation:", err);
  }
}

async function loadMainWeather(city) {
  try {
    const data = await getWeather(city, 'FR');
    
    if (!data || !data.main) return;
    
    const locEl = document.querySelector('.meteo-h1-localisation');
    const dateEl = document.querySelector('.meteo-h1-date');
    const tempEl = document.querySelector('.meteo-h1-temperature');
    
    if (locEl) locEl.textContent = data.main.city;
    if (dateEl) dateEl.textContent = data.main.date;
    if (tempEl) tempEl.textContent = `${data.main.temperature}°`;
  } catch (err) {
    console.error("Erreur météo principale:", err);
  }
}

async function loadRandomCitiesWeather() {
  try {
    const randomCities = getRandomCities(4);
    const weatherData = await getWeatherBatch(randomCities, 'fr');
    
    displayCitiesWeather(weatherData);
  } catch (err) {
    console.error("Erreur villes aléatoires:", err);
  }
}

function displayCitiesWeather(weatherData) {
  const listItems = document.querySelectorAll('.meteo-list-random-list li');
  
  listItems.forEach((item, index) => {
    if (!weatherData[index]) return;
    
    const city = weatherData[index];
    
    // Nom de la ville
    const nameEl = item.querySelector('.meteo-city span:first-child');
    if (nameEl) nameEl.textContent = city.name;
    
    // Température
    const tempEl = item.querySelector('.meteo-temperature');
    if (tempEl) tempEl.textContent = `${city.temperature}°`;
    
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
}