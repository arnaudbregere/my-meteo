    document.addEventListener('DOMContentLoaded', function() {
    const inputSearch = document.getElementById('meteo-search-localisation');
    const submitButton = document.getElementById('meteo-search-city');
    const autocompleteContainer = document.getElementById('meteo-autocomplete');
    const suggestionsContainer = document.getElementById('meteo-suggestions');

    // Fonction pour récupérer les suggestions depuis Nominatim
    async function fetchSuggestions(query) {
      if (query.length < 2) {
        autocompleteContainer.classList.remove('active');
        return;
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=8`
        );
        const data = await response.json();
        
        displaySuggestions(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des suggestions:', error);
        autocompleteContainer.classList.remove('active');
      }
    }

    // Fonction pour afficher les suggestions
    function displaySuggestions(suggestions) {
      autocompleteContainer.innerHTML = '';
      
      if (suggestions.length === 0) {
        autocompleteContainer.classList.remove('active');
        return;
      }

      suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.className = 'meteo-autocomplete-item';
        
        // Extraire le nom de la ville et du pays
        const displayName = suggestion.name;
        const country = suggestion.address?.country || '';
        
        div.textContent = `${displayName}${country ? ', ' + country : ''}`;
        
        // Au clic, remplir l'input avec la ville sélectionnée
        div.addEventListener('click', () => {
          inputSearch.value = displayName;
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

    // Validation du formulaire
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