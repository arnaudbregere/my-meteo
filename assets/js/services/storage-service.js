/*  Service centralisé pour localStorage */

function isLocalStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    console.warn('localStorage indisponible (mode privé ou restriction)', e.message);
    return false;
  }
}

export function getFromStorage(key, defaultValue = null) {
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
}

// Sauvegarde dans le Local Storage
export function saveToStorage(key, value) {
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
}

// Supprime du Local Storage
export function removeFromStorage(key) {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Erreur suppression storage [${key}]:`, error.message);
    return false;
  }
}