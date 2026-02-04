/**
 * Gestion de la police dyslexique avec fallback
 */

import { getFromStorage, saveToStorage } from '../services/storage-service.js';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleBtn = document.getElementById('dyslexia-toggle');

  if (!toggleBtn) return;

  /**
   * Applique le mode dyslexique au DOM
   */
  function applyDyslexiaMode(isEnabled) {
    if (isEnabled) {
      body.classList.add('dyslexic-font');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-pressed', 'true');
      toggleBtn.title = 'Police dyslexique activée - Cliquez pour désactiver';
    } else {
      body.classList.remove('dyslexic-font');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-pressed', 'false');
      toggleBtn.title = 'Police dyslexique désactivée - Cliquez pour activer';
    }
  }

  // ===== INITIALISATION =====
  const savedMode = getFromStorage('dyslexiaMode', false);
  applyDyslexiaMode(savedMode);

  // ===== GESTION DU CLIC =====
  toggleBtn.addEventListener('click', () => {
    const isCurrentlyEnabled = body.classList.contains('dyslexic-font');
    const newState = !isCurrentlyEnabled;
    
    applyDyslexiaMode(newState);
    saveToStorage('dyslexiaMode', newState);
  });

  // ===== GESTION CLAVIER (Enter / Space) =====
  toggleBtn.setAttribute('tabindex', '0');
  toggleBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleBtn.click();
    }
  });
});