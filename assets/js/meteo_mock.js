
const weatherData = {
  main: {
    city: "Paris",
    date: "Mardi | 14 Nov.",
    temperature: 24,
    humidity: 65,
    description: "Ensoleillé",
    icon: "sun.svg"
  },
  cities: [
    {
      name: "Angers",
      temperature: 70,
      description: "Ensoleillé",
      icon: "sun.svg",
      humidity: 58
    },
    {
      name: "Nantes",
      temperature: 87,
      description: "Neigeux",
      icon: "snow.svg",
      humidity: 72
    },
    {
      name: "Marseille",
      temperature: 67,
      description: "Pluvieux",
      icon: "rain.svg",
      humidity: 80
    },
    {
      name: "Nancy",
      temperature: 72,
      description: "Nuageux",
      icon: "cloud.svg",
      humidity: 65
    }
  ]
};

function loadMainMeteoData() {
  const localisationEl = document.querySelector('.meteo-h1-localisation');
  const dateEl = document.querySelector('.meteo-h1-date');
  const temperatureEl = document.querySelector('.meteo-h1-temperature');

  if (localisationEl) localisationEl.textContent = weatherData.main.city;
  if (dateEl) dateEl.textContent = weatherData.main.date;
  if (temperatureEl) temperatureEl.textContent = weatherData.main.temperature;
}


function loadCitiesMeteoData() {
  const listItems = document.querySelectorAll('.meteo-list-random ul li');

  listItems.forEach((item, index) => {
    if (weatherData.cities[index]) {
      const cityData = weatherData.cities[index];

      const cityNameEl = item.querySelector('.meteo-city span:first-child');
      if (cityNameEl) cityNameEl.textContent = cityData.name;

      const tempEl = item.querySelector('.meteo-temperature');
      if (tempEl) tempEl.textContent = `${cityData.temperature}°`;

      const weatherIcon = item.querySelector('.meteo-weather img');
      const weatherDesc = item.querySelector('.meteo-weather p');

      if (weatherIcon) {
        weatherIcon.setAttribute('data-file', cityData.icon);
        weatherIcon.setAttribute('alt', cityData.description);
      }

      if (weatherDesc) weatherDesc.textContent = cityData.description;
    }
  });
}


function initMeteo() {
  loadMainMeteoData();
  loadCitiesMeteoData();
  console.log('-----OK');
}


initMeteo()