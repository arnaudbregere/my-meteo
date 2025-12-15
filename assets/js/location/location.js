document.addEventListener('DOMContentLoaded', function() {
    const inputSearch = document.getElementById('meteo-search-localisation');
    const submitButton = document.getElementById('meteo-search-city');
    const autocompleteContainer = document.getElementById('meteo-autocomplete');
    const suggestionsContainer = document.getElementById('meteo-suggestions');

    // Fonction pour récupérer les suggestions depuis Nominatim
    async function fetchSuggestions(query) {

        let limitResponse = 50
        let france = 'fr'
      if (query.length < 2) {
        autocompleteContainer.classList.remove('active');
        return;
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=${limitResponse}&countrycodes=${france}`
        );

        // On convertit en json (response arrive en string)
        const data = await response.json();
        
        displaySuggestions(data);

      } catch (error) {
        console.error('Erreur lors de la récupération des suggestions:', error);
        autocompleteContainer.classList.remove('active');
      }
    }

    // Fonction pour filtrer les suggestions (villes/communes, villages) // TODO : rajouter les hameaux ? (hamlet)
    function filterCities(suggestions) {
      const validTypes = ['city', 'town', 'village'];
      return suggestions.filter(suggestion => validTypes.includes(suggestion.addresstype));
    }

    // Fonction pour afficher les suggestions
    function displaySuggestions(suggestions) {
      autocompleteContainer.innerHTML = '';
      // si aucune reponse, la div des suggestions est masquée
      if (suggestions.length === 0) {
        autocompleteContainer.classList.remove('active');
        return;
      }

      // Filtrer les doublons
      const uniqueSuggestions = filterCities(suggestions);

      uniqueSuggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.className = 'meteo-autocomplete-item';
        
        // Utiliser display_name pour avoir ville, région, pays
        const displayName = suggestion.display_name;
        const cityName = suggestion.name;
        
        div.textContent = displayName;
        
        // Au clic, remplir l'input avec seulement le nom de la ville
        div.addEventListener('click', () => {
          inputSearch.value = cityName;
          autocompleteContainer.classList.remove('active');
        });
        
        autocompleteContainer.appendChild(div);
      });

      autocompleteContainer.classList.add('active');
    }

    // Écouteur sur l'input pour déclencher la recherche
    inputSearch.addEventListener('input', (e) => {
      fetchSuggestions(e.target.value);
    });

    // Fermer les suggestions quand on clique ailleurs
    document.addEventListener('click', (e) => {
      if (e.target !== inputSearch) {
        autocompleteContainer.classList.remove('active');
      }
    });

    // Validation du formulaire côté client // Click sur le button submit "Rechercher"
    submitButton.addEventListener('click', function(event){
      if(inputSearch.value === '') {
        event.preventDefault();
        alert('Veuillez saisir une ville !');
      }
    });

    // Charger les suggestions statiques au chargement
    suggestionsContainer.addEventListener('click', (e) => {
      if (e.target.tagName === 'SPAN') {
        inputSearch.value = e.target.textContent;
      }
    });
})