// Masquer le Skeleton 
export function showSkeletonLoading() {
  const title = document.querySelector('.meteo-results-title');
  if (title) {
    title.classList.add('skeleton');
    title.style.minHeight = '80px';       // Garde la place
  }

  document.querySelectorAll('.meteo-results-details-item').forEach(el => {
    el.classList.add('skeleton');
    el.style.minHeight = '80px';
  });
}

// Afficher le Skeleton 
export function hideSkeletonLoading() {
  document.querySelector('.meteo-results-title')?.classList.remove('skeleton');
  document.querySelectorAll('.meteo-results-details-item').forEach(el => {
    el.classList.remove('skeleton');
  });
}