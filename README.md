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
my-meteo/
├── assets/
│
│   ├── css/
│   │   ├── base/                 # Styles globaux et transverses
│   │   │   ├── accessibility.css
│   │   │   ├── popin.css
│   │   │   └── validation.css
│   │   │
│   │   ├── layout/               # Layout commun (header, footer, structure)
│   │   │   ├── footer.css
│   │   │   ├── menu.css
│   │   │   └── meteo.css
│   │   │
│   │   ├── pages/                # Styles spécifiques par page
│   │   │   ├── search.css
│   │   │   ├── results.css
│   │   │   └── last-search.css
│   │   │
│   │   └── main.css              # Point d’entrée CSS (imports)
│
│   ├── images/
│   │   └── svg/                  # Icônes SVG
│
│   └── js/
│       ├── animations/           # Animations et interactions UI
│       │   ├── animations.js
│       │   └── swipe.js
│       │
│       ├── config/               # Configuration globale
│       │   └── meteo-config.js
│       │
│       ├── services/             # Accès aux données (APIs, storage)
│       │   ├── location-service.js
│       │   ├── meteo-weather.js
│       │   └── storage-service.js
│       │
│       ├── ui/                   # Manipulation du DOM / affichage
│       │   ├── meteo-dom.js
│       │   ├── popin.js
│       │   └── menu.js
│       │
│       ├── features/             # Logique métier par fonctionnalité
│       │   ├── accessibility.js
│       │   ├── location.js
│       │   ├── last-search.js
│       │   ├── results.js
│       │   └── search-history.js
│       │
│       ├── utils/                # Fonctions utilitaires
│       │   └── utils.js
│       │
│       └── meteo.js               # Point d’entrée JS (page accueil)
│
├── index.html
├── search.html
├── results.html
├── last_search.html
└── README.md
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