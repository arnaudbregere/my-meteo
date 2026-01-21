/**
 * Récupère les coordonnées d'une ville via Nominatim
 * Utilise les coordonnées (lat/lon) plutôt que le nom car :
 * - Unicité garantie (évite les ambiguïtés de noms)
 * - Standard universel accepté par toutes les APIs
 * - Indépendant des accents/encodages
 */
export async function getLocationCoordinates(cityName) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1&countrycodes=fr`
    );

    if (!response.ok) throw new Error("Erreur Nominatim");

    const data = await response.json();

    if (data.length === 0) {
      console.warn(`Aucune ville trouvée pour: ${cityName}`);
      return null;
    }

    const result = data[0];
    return {
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
      displayName: result.display_name.split(',')[0], // Récupère juste le nom de la ville
    };
  } catch (err) {
    console.error("Erreur lors de la récupération des coordonnées:", err);
    return null;
  }
}