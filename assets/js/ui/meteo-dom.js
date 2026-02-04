import { svgPath } from "../config/meteo-config.js"
import { OPENWEATHER_API } from "../config/api-endpoints.js";


// UI pour afficher les suggestions en Page d'accueil
export function renderCitiesList(weatherData) {
  const listItems = document.querySelectorAll('.meteo-list-random-list li');
  
  listItems.forEach((item, index) => {
    if (!weatherData[index]) return;
    
    const city = weatherData[index];
    
    const nameEl = item.querySelector('.meteo-city span:first-child');
    if (nameEl) nameEl.textContent = city.name;
    
    const tempEl = item.querySelector('.meteo-temperature');
    if (tempEl) tempEl.textContent = `${city.temperature}°`;
    
    const iconEl = item.querySelector('.meteo-weather img');
    if (iconEl) {
      iconEl.src = `${svgPath}${city.icon}`;
      iconEl.setAttribute('alt', city.description);
    }
    
    const descEl = item.querySelector('.meteo-weather p');
    if (descEl) descEl.textContent = city.description;
  });
}


// UI pour afficher les suggestions en Page de Résultats
export function renderWeatherResults(data, cityName) {
  const resultsCityEl = document.getElementById('meteo-results-city');
  if (resultsCityEl) resultsCityEl.textContent = cityName;
  
  const locEl = document.querySelector('.meteo-h2-localisation');
  const dateEl = document.querySelector('.meteo-h2-date');
  const tempEl = document.querySelector('.meteo-h2-temperature');
  const weatherEl = document.querySelector('.meteo-h2-weather');
  
  if (locEl) locEl.textContent = data.main.city;
  if (dateEl) dateEl.textContent = data.main.date;
  if (tempEl) tempEl.textContent = `${data.main.temperature}°`;
  if (weatherEl) {
    weatherEl.style.textTransform = 'capitalize'
    weatherEl.textContent = data.main.description;

  }
  
  const windSpeed = data.wind?.speed ? `${Math.round(data.wind.speed * 3.6)} km/h` : '--';
  const cloudiness = data.clouds?.all >= 0 ? `${data.clouds.all}%` : '--';
  const pressure = data.pressure ? `${data.pressure} hPa` : '--';
  const humidity = data.main?.humidity ? `${data.main.humidity}%` : '--';
  
  const windEl = document.querySelector('.meteo-wind-value');
  const rainEl = document.querySelector('.meteo-rain-value');
  const pressureEl = document.querySelector('.meteo-pressure-value');
  const humidityEl = document.querySelector('.meteo-humidity-value');
  
  if (windEl) windEl.textContent = windSpeed;
  if (rainEl) rainEl.textContent = cloudiness;
  if (pressureEl) pressureEl.textContent = pressure;
  if (humidityEl) humidityEl.textContent = humidity;

  // AFFICHAGE DE L'ICÔNE OFFICIELLE OPENWEATHERMAP 
  const iconCode = data.main?.iconCode || '01d';
  const iconUrl = `${OPENWEATHER_API.ICON}/${iconCode}@2x.png`;
  
  const iconEl = document.querySelector('.meteo-h2-weather-icon');
  if (iconEl) {
    iconEl.src = iconUrl;
    iconEl.alt = data.main?.description || 'Conditions météo';
  }
}


// Gestion Erreur Message
export function renderError(message = "Impossible de charger les résultats") {
  const resultsCityEl = document.getElementById('meteo-results-city');
  if (resultsCityEl) resultsCityEl.textContent = message || "Non trouvée";
  
  const locEl = document.querySelector('.meteo-h2-localisation');
  if (locEl) locEl.textContent = "Erreur - Pas de données pour cette ville";
  
  console.error(`${message}`);
}