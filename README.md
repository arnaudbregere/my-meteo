# 🌤️ My Meteo

Application météo moderne et responsive développée dans le cadre d'une **certification Front-End**.

## 📋 Description

**My Meteo** est une application web permettant de consulter les prévisions météorologiques en temps réel. L'application affiche la météo de différentes villes avec des détails complets : température, conditions météorologiques, vitesse du vent, taux d'humidité, pression atmosphérique et risque de pluie.

## 🎯 Objectif de la Certification

Ce projet valide les compétences suivantes du bloc **Développement Front-End** :

- ✅ Intégration de maquettes graphiques en HTML/CSS
- ✅ Respect des normes W3C (HTML5, CSS3)
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Accessibilité web (WCAG 2.1)
- ✅ SEO optimisé
- ✅ Développement JavaScript (ES6+)
- ✅ Intégration API (asynchrone)
- ✅ Validation de formulaires

## 🚀 Fonctionnalités

- 🌍 **Recherche de villes** : Interface intuitive pour chercher une ville
- 🌡️ **Affichage météo détaillé** : Température, conditions, vent, humidité, pression
- 📱 **Responsive Design** : Compatible mobile (375px), tablette (768px), desktop (1920px)
- ♿ **Accessibilité** : Labels ARIA, navigation au clavier, police adaptée aux dyslexiques
- 🔍 **SEO Optimisé** : Meta tags, balises sémantiques, schema.org
- 💾 **Favori** : Sauvegarde des dernières recherches
- 🎨 **UI Moderne** : Design épuré avec gradient et animations

## 🛠 Tech Stack

| Technologie | Utilisation |
|-------------|-------------|
| **HTML5** | Structure sémantique |
| **CSS3** | Styling responsive (Flexbox, Grid, Media queries) |
| **JavaScript ES6+** | DOM manipulation, async/await |
| **OpenWeatherMap API** | Données météorologiques en temps réel |
| **Google Fonts (Poppins)** | Typographie |

## 📖 Pages

### 1. **index.html** - Accueil
- Affichage de la météo actuelle (localisation, date, température)
- Liste de 4 villes avec prévisions rapides
- Navigation vers recherche et historique

### 2. **search.html** - Recherche
- Champ de saisie pour chercher une ville
- Suggestions de villes populaires
- Validation de formulaire côté client

### 3. **results.html** - Résultats
- Affichage détaillé de la météo pour une ville
- Indicateurs : vent, précipitations, pression, humidité
- Retour à la recherche

### 4. **menu.html** - Navigation
- Lien vers accueil
- Lien vers nouvelle recherche
- Lien vers dernières recherches

## ✅ Validations W3C

### HTML
```
✅ index.html    : 0 erreurs, 0 warnings
✅ search.html   : 0 erreurs, 0 warnings
✅ results.html  : 0 erreurs, 0 warnings
✅ menu.html     : 0 erreurs, 0 warnings
```

### CSS
```
✅ meteo.css     : 0 erreurs, 0 warnings
✅ search.css    : 0 erreurs, 0 warnings
✅ results.css   : 0 erreurs, 0 warnings
✅ menu.css      : 0 erreurs, 0 warnings
```

Validateurs :
- W3C HTML : https://validator.w3.org/
- W3C CSS : https://jigsaw.w3.org/css-validator/

## 📱 Responsive Design

| Appareil | Résolution | Support |
|----------|-----------|---------|
| Mobile | 375px | ✅ Optimisé |
| Tablette | 768px | ✅ Optimisé |
| Desktop | 1920px | ✅ Optimisé |

Media queries CSS pour chaque breakpoint.

## ♿ Accessibilité

### Conformité WCAG 2.1 AA

- ✅ **ARIA Labels** : Tous les éléments visuels ont des descriptions
- ✅ **Navigation Clavier** : Tab, Enter, Espace fonctionnels
- ✅ **Contraste Couleurs** : Ratio minimum 4.5:1
- ✅ **Police Dyslexie** : Support OpenDyslexic intégré
- ✅ **Alt Text** : Toutes les images ont un attribut `alt`
- ✅ **Hiérarchie Titres** : H1 → H2 → H3 correctement structurés

## 🔍 SEO

### Meta Tags
- `<meta charset="UTF-8">`
- `<meta name="viewport">`
- `<meta name="description">` (optimisé par page)
- `<meta name="keywords">`

### Balises Sémantiques
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`
- Hiérarchie H1/H2/H3 correcte
- `<strong>` et `<em>` pour emphase

### Schema.org
- Balisage `WeatherForecast` implémenté
- Données structurées pour moteurs de recherche

### Optimisation Performance
- Images en SVG (léger)
- CSS/JS commentés et organisés
- Lazy loading sur images

## 🔧 Installation & Utilisation

### Prérequis
- Navigateur moderne (Chrome, Firefox, Safari, Edge)
- Connexion Internet (pour API OpenWeatherMap)
- VS Code avec extension **Live Server** (optionnel, recommandé)

### Démarrage rapide

** Node.js (npx)**
```bash
# Cloner le repo
git clone https://github.com/arnaudbregere/my-meteo.git
cd my-meteo

# Lancer http-server sans installation
npx http-server

# Accédez à http://localhost:8080 dans votre navigateur
```
### Dépendances
✅ **Zéro dépendances !** Pas de `npm install` requis. Le projet utilise :
- HTML5 vanilla
- CSS3 vanilla
- JavaScript ES6+ vanilla
- API OpenWeatherMap (gratuite, publique)

## 📡 API Utilisée

### OpenWeatherMap
- **Endpoint** : `https://api.openweathermap.org/data/2.5/weather`
- **Documentation** : https://openweathermap.org/api
- **Paramètres** : 
  - `q` : Nom de la ville
  - `units=metric` : Unités Celsius
  - `lang=fr` : Langue française

## 📝 Code Quality

### Organisation
- Code commenté aux points clés
- Indentation uniforme (2 espaces)
- Nommage cohérent des classes (BEM)
- Variables CSS réutilisables

### Bonnes Pratiques
- Séparation HTML/CSS/JS
- Assets organisés par type
- Scripts en modules (type="module")
- Gestion d'erreurs API

## 🐛 Debugging

### Console du Navigateur (F12)
- Aucune erreur JavaScript
- Requêtes API affichées
- Logs de débogage optionnels

### Validation
```bash
# Valider HTML
https://validator.w3.org/

# Valider CSS
https://jigsaw.w3.org/css-validator/

# Tester accessibilité
https://www.webaim.org/resources/contrastchecker/
```

## 🚀 Déploiement

Possible sur :
- **GitHub Pages** : `gh-pages` branch
- **Netlify** : Drag & drop du dossier
- **Vercel** : Connexion GitHub
- **Serveur Apache/Nginx** : Upload simple

## 📚 Ressources

- [MDN Web Docs](https://developer.mozilla.org/)
- [W3C Standards](https://www.w3.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Google Fonts](https://fonts.google.com/)

## 👨‍💼 Auteur

**Arnaud Brégère** - Certification Front-End WEBECOM

## 📄 Licence

MIT - Libre d'utilisation

## 📞 Support

Pour questions ou signalement de bugs :
- Issues GitHub : [my-meteo/issues](https://github.com/arnaudbregere/my-meteo/issues)

---

**Dernière mise à jour** : Décembre 2025

**Status** : ✅ En cours de certification
