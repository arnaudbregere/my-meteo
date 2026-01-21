/**
 * hammer-gestures.js
 * Gestion des gestes tactiles avec Hammer.js
 * Permet de supprimer les villes en mode mobile avec un swipe
 */

// Charger Hammer.js depuis CDN
function loadHammerLibrary() {
  return new Promise((resolve) => {
    if (typeof Hammer !== 'undefined') {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js';
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

/**
 * Initialise les gestes de swipe sur les villes
 * @param {NodeList} elements - Liste des éléments à rendre swipables
 */
export async function initSwipeGestures(elements) {
  // Charger la librairie
  await loadHammerLibrary();
  
  if (typeof Hammer === 'undefined') {
    console.error("Hammer.js n'a pas pu être chargé");
    return;
  }
  
  console.log(`Hammer.js chargé - initialisation ${elements.length} éléments`);
  
  // Ajouter les gestes à chaque élément
  elements.forEach((item, index) => {
    const hammer = new Hammer(item);
    
    // Écouter les swipes (gauche et droite)
    hammer.on('swipeleft swiperight', (event) => {
      console.log(`Swipe détecté sur ville ${index}: ${event.type}`);
      removeCity(item);
    });
  });
}

/**
 * Supprime une ville avec animation de slide
 * @param {HTMLElement} element - L'élément à supprimer
 */
function removeCity(element) {
  // Ajouter la classe pour déclencher l'animation CSS
  element.classList.add('swipe-remove');
  
  // Supprimer du DOM après l'animation (300ms)
  setTimeout(() => {
    element.remove();
    console.log("Ville supprimée du DOM");
  }, 300);
}