# My Meteo 🌤️

Application météo en temps réel pour les villes françaises. Vanilla JavaScript, accessible WCAG 2.1 AA.

---

## Fonctionnalités

- **Recherche intelligente** : Autocomplétion Nominatim/OpenStreetMap
- **Données en temps réel** : Température, vent, pression, humidité (OpenWeatherMap)
- **Historique** : Sauvegarde des 50 dernières recherches (localStorage)
- **Mobile** : Gestes swipe, responsive design (Hammer.js)
- **Accessibilité** : WCAG 2.1 AA, police dyslexique, navigation clavier

---

## Installation

```bash
npm start
# Ou : npx http-server
```

Ouvre `http://localhost:8080`

---

## Architecture du Projet

```
my-meteo/
├── index.html                    # Page d'accueil
├── about.html                    # À propos
├── last_search.html              # Historique des recherches
├── package.json
├── .gitignore
│
├── assets/
│   ├── css/
│   │   ├── base/
│   │   │   ├── accessibility.css
│   │   │   ├── popin.css
│   │   │   └── validation.css
│   │   ├── layout/
│   │   │   ├── footer.css
│   │   │   ├── header.css
│   │   │   ├── menu.css
│   │   │   └── meteo.css
│   │   ├── pages/
│   │   │   ├── about.css
│   │   │   ├── last-search.css
│   │   │   ├── results.css
│   │   │   └── search.css
│   │   └── main.css
│   │
│   ├── images/
│   │   └── svg/                  # Icônes météo
│   │
│   └── js/
│       ├── animations/
│       │   ├── skeleton-loader.js
│       │   └── swipe-gestures.js
│       │
│       ├── config/
│       │   ├── api-endpoints.js
│       │   └── weather-config.js
│       │
│       ├── services/
│       │   ├── location-service.js      # Nominatim/OSM
│       │   ├── weather-service.js       # OpenWeatherMap
│       │   ├── search-history.js        # Historique
│       │   └── storage-service.js       # localStorage
│       │
│       ├── features/
│       │   ├── search-manager.js        # Logique recherche
│       │   ├── search-ui.js             # UI recherche
│       │   ├── history-manager.js       # Logique historique
│       │   └── history-ui.js            # UI historique
│       │
│       ├── ui/
│       │   ├── meteo-dom.js             # Rendu météo
│       │   ├── popin-manager.js         # Popins
│       │   └── menu.js                  # Menu
│       │
│       ├── utils/
│       │   └── utils.js
│       │
│       ├── accessibility.js             # Police dyslexique
│       ├── home.js                      # Point d'entrée accueil
│       └── menu.js
```

---

## Architecture Modulaire

4 couches bien séparées :

| Couche | Responsabilité | Fichiers |
|--------|---|---|
| **UI Layer** | Interactions & DOM | search-ui.js, history-ui.js, meteo-dom.js |
| **Features Layer** | Logique métier | search-manager.js, history-manager.js |
| **Services Layer** | APIs & données | weather-service.js, location-service.js, storage-service.js |
| **Config & Utils** | Constantes & helpers | api-endpoints.js, weather-config.js, utils.js |

---

## Stack

- **Frontend** : HTML5, CSS3, Vanilla JavaScript (ES6 modules)
- **APIs** : OpenWeatherMap, Nominatim/OpenStreetMap
- **Storage** : localStorage (côté client)
- **Library** : Hammer.js (gestes tactiles) 
- **Accessibilité** : WCAG 2.1 AA, ARIA labels, Open Dyslexic font

---

## Flux Utilisateur

```
User tape "Paris" (search-ui.js)
  ↓ Validation (search-manager.js)
  ↓ API Nominatim (location-service.js)
  ↓ Affichage suggestions (search-ui.js)
User clique "Paris"
  ↓ API OpenWeatherMap (weather-service.js)
  ↓ Historique localStorage (search-history.js)
  ↓ Rendu résultat (meteo-dom.js)
  ↓ Affichage final ✓
```

---

## Auteur

Arnaud Brégère  
arnaud.bregere@gmail.com  
https://github.com/arnaudbregere/my-meteo

---

**Licence** : MIT