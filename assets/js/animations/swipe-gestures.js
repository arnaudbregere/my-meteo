/**
 * Gestion des gestes tactiles avec Hammer.js
 * Permet de supprimer les villes avec un swipe
 */

/**
 * Initialise les gestes de swipe sur les villes
 * - Distance minimum = 10 pixels pour valider le geste + velocity >= 0.3 pixels/ms
 */
export async function initSwipeGestures(elements) {

  
  // Vérification de sécurité (si le CDN est down)
  if (typeof Hammer === 'undefined') {
    console.error("Hammer.js n'a pas pu être chargé. Gestes tactiles désactivés.");
    return;
  }
  
  
  // Ajouter les gestes à chaque ville
  elements.forEach((item, index) => {
    // Créer une instance Hammer pour cet élément
    // Les "recognizers" vont analyser les touches sur cet élément
    const hammer = new Hammer(item, {
      // threshold : distance minimum (pixels) avant de considérer comme geste
      threshold: 10,
      // velocity : vitesse minimum (pixels/ms) pour valider un swipe
      velocity: 0.3
    });
    
    // Écouter les événements 'swipeleft' et 'swiperight'
    // Ces événements sont générés automatiquement par Hammer quand
    // un geste match les critères (distance + vitesse)
    hammer.on('swiperight', (event) => {
      removeCity(item);
    });
  });
}

/**
 * Supprime une ville avec animation de slide
 */
function removeCity(element) {
  // Ajouter la classe pour déclencher l'animation CSS
  element.classList.add('swipe-remove');
  
  // Attendre la fin de l'animation avant supprimer du DOM
  setTimeout(() => {
    element.remove();
  }, 300);
}