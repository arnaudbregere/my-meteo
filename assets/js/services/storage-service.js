// Service pour le Local Storage

// Vérifie si localStorage est disponible (pas en nav privée)
const isLocalStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    console.warn('localStorage indisponible (mode privé ou restriction)', e.message);
    return false;
  }
};

// Récupère une valeur du localStorage
export const getStorageItem = (key, defaultValue = null) => {
  if (!isLocalStorageAvailable()) return defaultValue;
  
  try {
    const data = localStorage.getItem(key);
    if (!data) return defaultValue;
    
    // Essayer de parser en JSON, sinon retourner en string
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  } catch (error) {
    console.error(`Erreur lecture storage [${key}]:`, error.message);
    return defaultValue;
  }
};

// Sauvegarde une valeur dans le localStorage
export const setStorageItem = (key, value) => {
  if (!isLocalStorageAvailable()) {
    return false;
  }
  
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Erreur écriture storage [${key}]:`, error.message);
    return false;
  }
};

// Supprime une valeur du localStorage
export const removeStorageItem = (key) => {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Erreur suppression storage [${key}]:`, error.message);
    return false;
  }
};