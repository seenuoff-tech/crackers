// Safe LocalStorage wrapper to prevent DOMException crashes in sandboxed iframes (like AI Studio and Vercel previews)
export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn(`[StorageService] Blocked reading key "${key}":`, e);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`[StorageService] Blocked writing key "${key}":`, e);
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[StorageService] Blocked removing key "${key}":`, e);
    }
  }
};
