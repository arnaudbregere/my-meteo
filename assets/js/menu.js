document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.meteo-menu-button');
  const closeBtn = document.querySelector('.meteo-menu-close-button');
  const nav = document.querySelector('nav');

  if (menuBtn && closeBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.style.display = 'block';
      menuBtn.style.display = 'none';
      closeBtn.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
      nav.style.display = 'none';
      menuBtn.style.display = 'block';
      closeBtn.style.display = 'none';
    });
  }
});