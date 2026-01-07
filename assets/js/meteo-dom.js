import { svgPath } from "./meteo-config.js";

export function renderMainWeather(data) {
  if (!data || !data.main) return;

  const locEl = document.querySelector('.meteo-h1-localisation');
  const dateEl = document.querySelector('.meteo-h1-date');
  const tempEl = document.querySelector('.meteo-h1-temperature');
  
  if (locEl) locEl.textContent = data.main.city;
  if (dateEl) dateEl.textContent = data.main.date;
  if (tempEl) tempEl.textContent = `${data.main.temperature}°`;
}

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
  if (weatherEl) weatherEl.textContent = data.main.description;
  
  const windSpeed = data.wind?.speed ? `${Math.round(data.wind.speed * 3.6)} km/h` : '--';
  const cloudiness = data.clouds?.all ? `${data.clouds.all}%` : '--';
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

  // === AFFICHAGE DE L'ICÔNE OFFICIELLE OPENWEATHERMAP ===
  const iconCode = data.main?.iconCode || '01d'; // fallback très rare
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
  const iconEl = document.querySelector('.meteo-h2-weather-icon');
  if (iconEl) {
    iconEl.src = iconUrl;
    iconEl.alt = data.main?.description || 'Conditions météo';
  }

  console.log("✅ Résultats affichés avec icône OpenWeatherMap :", iconCode);
}

export function renderError(message = "Impossible de charger les résultats") {
  const resultsCityEl = document.getElementById('meteo-results-city');
  if (resultsCityEl) resultsCityEl.textContent = message || "Non trouvée";
  
  const locEl = document.querySelector('.meteo-h2-localisation');
  if (locEl) locEl.textContent = "Erreur";
  
  console.error(`❌ ${message}`);
}