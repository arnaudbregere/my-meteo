# My Meteo 🌤️

Application météo simple pour consulter les conditions en France.

## Installation

Aucune dépendance à installer. Juste un serveur HTTP :

```bash
npx http-server
```

Puis ouvre `http://localhost:8080`

## Fonctionnalités

- **Accueil** : Météo actuelle + 4 villes aléatoires
- **Recherche** : Autocomplétion intelligente avec Nominatim/OSM
- **Résultats** : Température, vent, pression, humidité
- **Historique** : Sauvegarde en localStorage
- **Mobile** : Swipe pour supprimer les suggestions (Hammer.js)
- **Accessible** : Police dyslexique, navigation clavier, aria-labels

## Stack technique

- HTML5 / CSS3
- JavaScript ES6 Modules (pas de build tool)
- **APIs externes** :
  - OpenWeatherMap (données météo)
  - Nominatim/OSM (géolocalisation)
- **Librairie** : Hammer.js pour gestes tactiles (CDN)

## Architecture

```
assets/
├── css/meteo.css
├── images/svg/          # Icônes SVG
└── js/
    ├── meteo.js         # Accueil
    ├── results.js       # Résultats recherche
    ├── location.js      # Recherche + autocomplétion
    ├── meteo-weather.js # API OpenWeatherMap
    ├── location-service.js # API Nominatim
    ├── swipe.js         # Gestes tactiles
    ├── accessibility.js # Police dyslexique
    └── ...
```

## Design

- ✅ Responsive (mobile, tablet, desktop)
- ✅ Accessible (WCAG, ARIA, clavier)
- ✅ SEO optimisé (schema.org, meta tags)
- ✅ Performance (SVG, lazy loading)

## Navigateurs

Chrome, Firefox, Safari, Edge (versions récentes).

---

**Notes** : Application légère sans npm, facile à déployer. Code modulaire et commenté.