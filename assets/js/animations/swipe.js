/**
 * Gestion des gestes tactiles avec Hammer.js
 * Permet de supprimer les villes en mode mobile avec un swipe
 */

/**
 * Charge Hammer.js depuis CDN (seulement si nécessaire)
 * 
 * Fonctionnement :
 * 1. Vérifie si Hammer est déjà en mémoire (typeof Hammer)
 * 2. Si oui : résout la Promise immédiatement (déjà chargée)
 * 3. Si non : crée un <script> et le charge dynamiquement
 * 4. Quand le script est chargé, résout la Promise
 * 
 * @returns {Promise} Résout quand Hammer.js est disponible
 */
function loadHammerLibrary() {
  return new Promise((resolve) => {
    // Vérifier si Hammer existe déjà (peut être chargée en HTML)
    if (typeof Hammer !== 'undefined') {
      console.log("Hammer.js déjà disponible");
      resolve();
      return;
    }
    
    console.log("Chargement de Hammer.js depuis CDN...");
    
    // Créer un élément <script> et le charger
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js';
    script.async = true;
    
    // Quand le script est chargé, Hammer est disponible globalement
    script.onload = () => {
      console.log("Hammer.js chargée avec succès");
      resolve();
    };
    
    script.onerror = () => {
      console.error("Erreur chargement Hammer.js");
      resolve(); // Résout quand même (fallback)
    };
    
    document.head.appendChild(script);
  });
}

/**
 * Initialise les gestes de swipe sur les villes
 * 
 * - Swipe = glisser rapidement le doigt (velocity >= 0.3 pixels/ms)
 * - Distance minimum = 10 pixels pour valider le geste
 * 
 * @param {NodeList} elements - Liste des éléments swipables (les villes)
 */
export async function initSwipeGestures(elements) {
  // Attendre que Hammer.js soit chargée
  await loadHammerLibrary();
  
  // Vérification de sécurité (si le CDN est down)
  if (typeof Hammer === 'undefined') {
    console.error("Hammer.js n'a pas pu être chargé. Gestes tactiles désactivés.");
    return;
  }
  
  console.log(`Initialisation des gestes sur ${elements.length} éléments`);
  
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
    hammer.on('swipeleft swiperight', (event) => {
      console.log(`Swipe détecté sur ville ${index}: direction ${event.type}`);
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
  
  // Attendre la fin de l'animation avant supprimer du DOM
  setTimeout(() => {
    element.remove();
    console.log("Ville supprimée du DOM");
  }, 300);
}