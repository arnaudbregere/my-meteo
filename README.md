# My Meteo 🌤️

Application météo simple et moderne.

## Installation

```bash
# Aucune dépendance à installer
npm install http-server -g
```

## Lancer l'app

```bash
npx http-server
```

Ouvre `http://localhost:8080` dans ton navigateur.

## Fonctionnalités

- 🏠 **Accueil** : Météo de Paris + 4 villes aléatoires
- 🔍 **Recherche** : Cherche une ville française (autocomplétion Nominatim)
- 📍 **Résultats** : Affiche température, vent, pression, humidité
- 📱 **Swipe** : Supprimer les villes en glissant (mobile)

## Tech Stack

- HTML5 / CSS3
- JavaScript (ES6 Modules)
- **APIs** :
  - OpenWeather (météo)
  - Nominatim / OSM (géolocalisation)


## Librairie
- Hammer.js (swipe en mode mobile) chargée côté client en CDN
## Structure

```
assets/
├── css/
├── images/
└── js/
    ├── meteo.js (page d'accueil)
    ├── results.js (résultats recherche)
    ├── meteo-weather.js (API OpenWeather)
    ├── location-service.js (API Nominatim)
    ├── meteo-dom.js (affichage DOM)
    ├── swipe.js (gestes tactiles)
    ├── meteo-config.js (config)
    ├── utils/
    │   └── utils.js (utilitaires)
    └── location/
        └── location.js (recherche)
```

## Notes
- Compatible mobile/desktop