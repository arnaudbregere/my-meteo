/**
 * Gestion de la recherche et autocomplétion de villes
 */

document.addEventListener('DOMContentLoaded', function() {
  const inputSearch = document.getElementById('meteo-search-localisation');
  const submitButton = document.getElementById('meteo-search-city');
  const autocompleteContainer = document.getElementById('meteo-autocomplete');
  const suggestionsContainer = document.getElementById('meteo-suggestions');
  
  PopinManager.init('popin-overlay', 'popin-container', 'popin-close');

  let debounceTimer;
  let isValidInput = false;

  // Regex : accepte lettres (avec ou sans accents), tirets, apostrophes, espaces
  const cityPattern = /^[a-zA-Z\u00C0-\u024F\s\-']{2,}$/;

  /**
   * Crée ou met à jour le message d'erreur/succès
   */
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

  /**
   * Valide le format de la saisie en temps réel
   */
  function validateInput(value) {
    const trimmed = value.trim();

    // Vide
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

    // Caractères invalides
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

  /**
   * Récupère les suggestions depuis Nominatim
   */
  async function fetchSuggestions(query) {
    if (query.length < 2) {
      autocompleteContainer.classList.remove('active');
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=50&countrycodes=fr`
      );

      const data = await response.json();
      displaySuggestions(data, query);
    } catch (error) {
      console.error('Erreur suggestions:', error);
      autocompleteContainer.classList.remove('active');
    }
  }

  /**
   * Filtre : accepte les villes et lieux habités
   * Utilise addresstype comme critère principal
   */
  function filterCities(suggestions, query) {
    const queryLower = query.toLowerCase();
    
    // AddressTypes acceptables (villes, villages, quartiers habités)
    const acceptedAddressTypes = ['city', 'town', 'village', 'hamlet', 'locality', 'suburb'];
    
    // Filtre : rejette les types non-pertinents
    let cities = suggestions.filter(s => {
      // Doit avoir un addresstype accepté
      if (!acceptedAddressTypes.includes(s.addresstype)) {
        return false;
      }
      
      // Le nom doit au moins commencer par les 2 premiers caractères de la recherche
      // (évite les résultats complètement décalés)
      if (!s.name.toLowerCase().startsWith(queryLower.substring(0, 2))) {
        return false;
      }
      
      return true;
    });
    
    // Déduplique par nom (evite Paris / Paris apparaître 2x)
    const seen = new Set();
    cities = cities.filter(city => {
      const nameLower = city.name.toLowerCase();
      if (seen.has(nameLower)) {
        return false;
      }
      seen.add(nameLower);
      return true;
    });
    
    console.log(`Recherche: "${query}" | Résultats Nominatim: ${suggestions.length} | Après filtre: ${cities.length}`);
    
    // Tri : villes qui commencent EXACTEMENT par la recherche EN PREMIER
    return cities.sort((a, b) => {
      const aStartsWith = a.name.toLowerCase().startsWith(queryLower);
      const bStartsWith = b.name.toLowerCase().startsWith(queryLower);
      
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      return 0;
    });
  }

  /**
   * Affiche les suggestions d'autocomplétion
   */
  function displaySuggestions(suggestions, query) {
    autocompleteContainer.innerHTML = '';
    
    if (!suggestions.length) {
      autocompleteContainer.classList.remove('active');
      return;
    }

    const cities = filterCities(suggestions, query);

    // Si aucune ville après filtrage, ne rien afficher
    if (!cities.length) {
      autocompleteContainer.classList.remove('active');
      return;
    }

    cities.forEach(city => {
      const div = document.createElement('div');
      div.className = 'meteo-autocomplete-item';
      div.textContent = city.name;
      
      div.addEventListener('click', () => {
        inputSearch.value = city.name;
        autocompleteContainer.classList.remove('active');
        validateInput(city.name);
      });
      
      autocompleteContainer.appendChild(div);
    });

    autocompleteContainer.classList.add('active');
  }

  // Autocomplétion avec debounce
  inputSearch.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value;
    
    // Validation en temps réel (saisie)
    validateInput(query);
    
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

  // Validation au submit (bloque si format invalide)
  submitButton.addEventListener('click', (event) => {
    validateInput(inputSearch.value);
    
    if (!isValidInput) {
      event.preventDefault();
      PopinManager.show();
    }
  });

  // Suggestions statiques au clic
  suggestionsContainer?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      inputSearch.value = e.target.textContent;
      validateInput(e.target.textContent);
    }
  });
});