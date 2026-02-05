/*
 * Gestion de la recherche et autocomplétion de villes sur index.html
 * Fusionne la logique de location.js (recherche + autocomplétion) et results.js (affichage résultats)
 * UI uniquement
*/

import { searchCities } from '../services/location-service.js';
import { getWeatherByCoordinates } from '../services/meteo-weather.js';
import { getLocationCoordinates } from '../services/location-service.js';
import { renderWeatherResults, renderError } from '../ui/meteo-dom.js';
import { addToSearchHistory } from './search-history.js';
import { showSkeletonLoading, hideSkeletonLoading } from '../animations/animations.js';
import { updateImageSources } from '../utils/utils.js';

document.addEventListener('DOMContentLoaded', function() {

  // Récupération des éléments HTML
  const inputSearch = document.getElementById('meteo-search-localisation');
  const submitButton = document.getElementById('meteo-search-city');
  const autocompleteContainer = document.getElementById('meteo-autocomplete');
  const searchForm = document.getElementById('meteo-search-form');
  const searchResultsSection = document.getElementById('search-results-section');
  const newSearchBtn = document.getElementById('new-search-btn');

  // Initialisation Popin
  PopinManager.init('popin-overlay', 'popin-container', 'popin-close');

  let debounceTimer;
  let isValidInput = false;

  // Regex : accepte les lettres (avec accents), espaces et tirets, minimum 2 caractères
  const cityPattern = /^[a-zA-Z\u00C0-\u024F\s\-']{2,}$/;

  /* Crée ou met à jour le message d'erreur/succès d'après la validation */
  function updateValidationMessage(message, isValid) {
    let errorMsg = document.getElementById('validation-message');

    if (!errorMsg) {
      errorMsg = document.createElement('p');
      errorMsg.id = 'validation-message';
      errorMsg.className = 'meteo-validation-message';
      errorMsg.setAttribute('role', 'status');
      errorMsg.setAttribute('aria-live', 'polite');
      inputSearch.parentNode.insertBefore(errorMsg, inputSearch.nextSibling);
    }

    errorMsg.textContent = message;
    errorMsg.className = `meteo-validation-message ${isValid ? 'valid' : 'invalid'}`;
    inputSearch.classList.toggle('has-error', !isValid);
    inputSearch.classList.toggle('has-success', isValid);
    inputSearch.setAttribute('aria-invalid', !isValid);
  }

  /* Valide le format du champ saisie et met à jour l'état isValidInput */
  function validateInput(value) {
    const trimmed = value.trim();

    // Champ vide
    if (!trimmed) {
      updateValidationMessage('Veuillez saisir une ville', false);
      isValidInput = false;
      submitButton.disabled = true;
      return;
    }

    // Moins de 2 caractères
    if (trimmed.length < 2) {
      updateValidationMessage('Minimum 2 caractères requis', false);
      isValidInput = false;
      submitButton.disabled = true;
      return;
    }

    // Caractères non autorisés (regex cityPattern)
    if (!cityPattern.test(trimmed)) {
      updateValidationMessage('Caractères non autorisés. Lettres et tirets uniquement (pas de chiffres)', false);
      isValidInput = false;
      submitButton.disabled = true;
      return;
    }

    // Format valide
    updateValidationMessage('✓ Format valide', true);
    isValidInput = true;
    submitButton.disabled = false;
  }

  /* Récupère les suggestions de villes depuis Nominatim */
  async function fetchSuggestions(query) {
    if (query.length < 2) {
      autocompleteContainer.classList.remove('active');
      return;
    }

    const data = await searchCities(query);

    if (!data.length) {
      autocompleteContainer.classList.remove('active');
      updateValidationMessage('Veuillez saisir un nom de ville valide', false);
      submitButton.disabled = true;
      return;
    }

    displaySuggestions(data, query);
  }

  /*
   * Filtre et organise les villes :
   * - lieux habités uniquement (ville, commune, village, etc.)
   * - pas de doublons
   * - priorité aux noms commençant par la recherche
   */
  function filterCities(suggestions, query) {
    const queryLower = query.toLowerCase();
    const acceptedTypes = ['city', 'town', 'village', 'hamlet', 'locality', 'suburb'];

    const results = [];
    const seenNames = {};

    suggestions.forEach(suggestion => {
      const name = suggestion.name;
      const nameLower = name.toLowerCase();

      // Filtrer par type (habitations uniquement)
      if (!acceptedTypes.includes(suggestion.addresstype)) return;
      // Ne pas afficher si ne correspond pas au début
      if (!nameLower.startsWith(queryLower.substring(0, 2))) return;
      // Ne pas afficher les doublons
      if (seenNames[nameLower]) return;

      seenNames[nameLower] = true;

      // Priorité aux noms commençant exactement par la recherche
      if (nameLower.startsWith(queryLower)) {
        results.unshift(suggestion);
      } else {
        results.push(suggestion);
      }
    });

    return results;
  }

  /* Affiche les suggestions dans le dropdown d'autocomplétion */
  function displaySuggestions(suggestions, query) {
    autocompleteContainer.innerHTML = '';

    const cities = filterCities(suggestions, query);

    // Si aucune ville après filtrage, ne rien afficher et bloquer le bouton
    if (!cities.length) {
      autocompleteContainer.classList.remove('active');
      submitButton.disabled = true;
      updateValidationMessage('Veuillez saisir un nom de ville valide', false);
      return;
    }

    // Suggestions trouvées => activer le bouton
    submitButton.disabled = false;

    cities.forEach(city => {
      const div = document.createElement('div');
      div.className = 'meteo-autocomplete-item';
      div.textContent = city.name;
      
      // Au clic sur une suggestion, la remplir dans l'input
      div.addEventListener('click', () => {
        inputSearch.value = city.name;
        autocompleteContainer.classList.remove('active');
        validateInput(city.name);
      });
      
      autocompleteContainer.appendChild(div);
    });

    // Afficher le dropdown
    autocompleteContainer.classList.add('active');
  }

  /* Affiche les résultats météo dans la section dédiée (sous le bouton, colonne gauche) */
  async function displayWeatherResults(cityName) {
    try {

      // Afficher le skeleton loader
      showSkeletonLoading();

      // Afficher la section résultats (elle s'affiche sous le bouton dans la colonne gauche)
      searchResultsSection.style.display = 'block';

      // Étape 1: Récupérer les coordonnées via Nominatim
      const location = await getLocationCoordinates(cityName);

      if (!location) {
        console.error("Ville non trouvée");
        renderError("Ville non trouvée");
        hideSkeletonLoading();
        return;
      }

      console.log(`Coordonnées trouvées: ${location.lat}, ${location.lon}`);

      // Étape 2: Récupérer la météo avec ces coordonnées
      const data = await getWeatherByCoordinates(location.lat, location.lon, location.displayName);

      if (!data?.main) {
        console.error("Données météo invalides");
        renderError();
        hideSkeletonLoading();
        return;
      }

      // Étape 3: Afficher les résultats
      renderWeatherResults(data, location.displayName);

      // Masquer le skeleton loader
      hideSkeletonLoading();

      // Étape 4: Ajouter à l'historique
      addToSearchHistory(cityName);

      // Étape 5: Scroll vers les résultats
      searchResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
    } catch (err) {
      console.error("Erreur lors du chargement:", err);
      renderError();
      hideSkeletonLoading();
    }
  }

  /* ===== GESTION DES ÉVÉNEMENTS DU FORMULAIRE ===== */

  // Autocomplétion avec debounce (300ms)
  inputSearch.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value;
    
    // Validation en temps réel (saisie)
    validateInput(query);
    
    // Recherche avec debounce (évite trop d'appels API)
    debounceTimer = setTimeout(() => {
      if (isValidInput) {
        fetchSuggestions(query);
      }
    }, 300);
  });

  // Fermer suggestions au clic ailleurs
  document.addEventListener('click', (e) => {
    if (e.target !== inputSearch) {
      autocompleteContainer.classList.remove('active');
    }
  });
  // Validation et recherche au submit du formulaire
  searchForm.addEventListener('submit', (event) => {
    debugger
    event.preventDefault();
    
    // Valider l'input
    validateInput(inputSearch.value);
    
    // Si invalide, afficher la popin via PopinManager (pas de duplication)
    if (!isValidInput) {
      PopinManager.show();
      return;
    }

    // Afficher les résultats (sous le bouton, dans la colonne gauche)
    const cityName = inputSearch.value.trim();
    displayWeatherResults(cityName);
  });

  // Bouton nouvelle recherche : réinitialiser le formulaire et les résultats
  newSearchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    inputSearch.value = '';
    autocompleteContainer.innerHTML = '';
    autocompleteContainer.classList.remove('active');
    searchResultsSection.style.display = 'none';
    updateValidationMessage('', false);
    submitButton.disabled = true;
    inputSearch.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // UPDATE DES IMAGES (une seule fois au chargement global)
  updateImageSources();
});