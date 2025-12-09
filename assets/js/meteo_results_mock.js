const cities = 
  {
    name: 'Angers',
    temp: 25,
    weather: 'Nuageux',
    wind: '3.7 km/h',
    rain: '74 %',
    pressure: '1010 mbar',
    humidity: '83 %'
  }

function getFormattedDate() {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short'
  });
  return formatter.format(date);
}

document.querySelector('.meteo-h2-localisation').textContent = cities.name;
document.querySelector('.meteo-h2-date').textContent = getFormattedDate();
document.querySelector('.meteo-h2-temperature').textContent = cities.temp;
document.querySelector('.meteo-h2-weather').textContent = cities.weather;
document.getElementById('meteo-results-city').textContent = cities.name;

document.querySelector('.meteo-wind-value').textContent = cities.wind;
document.querySelector('.meteo-rain-value').textContent = cities.rain;
document.querySelector('.meteo-pressure-value').textContent = cities.pressure;
document.querySelector('.meteo-humidity-value').textContent = cities.humidity;