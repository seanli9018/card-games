export type StorageType = "localStorage" | "sessionStorage";

export const setStorage = (
  key: string,
  value: string,
  expirationInMinutes: number,
  storageType: StorageType = "localStorage"
) => {
  try {
    const storage = window[storageType];
    const expirationTime = expirationInMinutes
      ? Date.now() + expirationInMinutes * 60 * 1000
      : null;

    const item = {
      value,
      expirationTime,
    };

    storage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error("Error setting storage:", error);
  }
};

export const getStorage = (
  key: string,
  storageType: StorageType = "localStorage"
) => {
  if (typeof window === "undefined") return null;

  try {
    const storage = window[storageType];
    const itemStr = storage.getItem(key);

    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    if (item.expirationTime && Date.now() > item.expirationTime) {
      // Remove expired item
      storage.removeItem(key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.error("Error getting storage:", error);
    return null;
  }
};

export const removeStorage = (
  key: string,
  storageType: StorageType = "localStorage"
) => {
  if (typeof window === "undefined") return null;

  try {
    const storage = window[storageType];
    storage.removeItem(key);
  } catch (error) {
    console.error("Error removing storage:", error);
  }
};
