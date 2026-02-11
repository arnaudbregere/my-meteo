// Gestion du Menu

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.meteo-menu-button');
  const closeBtn = document.querySelector('.meteo-menu-close-button');
  const nav = document.querySelector('nav');
  const body = document.body;

  if (menuBtn && closeBtn && nav) {
    const closeMenu = () => {
      nav.style.display = 'none';
      menuBtn.style.display = 'block';
      closeBtn.style.display = 'none';
      body.style.overflow = 'auto';
    };

    // Ouvrir le menu
    menuBtn.addEventListener('click', () => {
      nav.style.display = 'block';
      menuBtn.style.display = 'none';
      closeBtn.style.display = 'block';
      body.style.overflow = 'hidden';
    });

    // Fermer le menu
    closeBtn.addEventListener('click', closeMenu);

    // Fermer le menu au clic sur un lien
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Fermer avec Échap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.style.display === 'block') {
        closeMenu();
      }
    });
  }
});