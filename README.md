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
│   │   │   ├── accessibility.css # Accessibilité (focus, contrastes, dyslexie)
│   │   │   ├── popin.css         # Modales et popins
│   │   │   └── validation.css    # États de validation / erreurs
│   │   │
│   │   ├── layout/               # Structure commune (header, footer, layout)
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
│   │   └── svg/                  # Icônes météo SVG
│
│   └── js/
│       ├── animations/           # Animations et interactions UI
│       │   ├── animations.js     # Animations visuelles
│       │   └── swipe.js          # Gestes tactiles (Hammer.js)
│       │
│       ├── config/               # Configuration globale
│       │   ├── meteo-config.js   # Clés API, paramètres globaux
│       │   └── api-endpoints.js  # URLs des APIs externes
│       │
│       ├── services/             # Accès aux données 
│       │   ├── location-service.js # Géolocalisation (Nominatim / OSM)
│       │   ├── meteo-weather.js    # API météo + transformation des données
│       │   └── storage-service.js  # localStorage
│       │
│       ├── ui/                   # Manipulation du DOM / affichage
│       │   ├── meteo-dom.js      # Rendu météo
│       │   ├── popin.js          # Gestion des popins
│       │   └── menu.js           # Menu et navigation
│       │
│       ├── features/             # Logique métier par fonctionnalité
│       │   ├── accessibility.js  # Navigation clavier, ARIA
│       │   ├── location.js       # Recherche et sélection de ville
│       │   ├── last-search.js    # Dernières recherches
│       │   ├── results.js        # Page résultats météo
│       │   └── search-history.js # Historique et suggestions
│       │
│       ├── utils/                # Fonctions utilitaires 
│       │   └── utils.js
│       │
│       └── meteo.js              # Point d’entrée JS (page accueil)
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