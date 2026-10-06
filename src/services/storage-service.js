/**
 * Resilient implementation of StorageService with automatic in-memory fallback.
 * Guarantees zero crashes if browser localStorage is blocked, unavailable, or throws.
 */
export class StorageService {
  constructor(customStorage) {
    /** @type {Map<string, string>} */
    this.inMemoryFallback = new Map();

    if (customStorage !== undefined) {
      this.storage = customStorage;
    } else {
      try {
        this.storage = typeof window !== "undefined" && window.localStorage ? window.localStorage : null;
      } catch {
        this.storage = null;
      }
    }
  }

  getItem(key, fallback) {
    try {
      if (!this.storage) {
        return this.getFromMemory(key, fallback);
      }
      const item = this.storage.getItem(key);
      if (item === null) {
        return this.getFromMemory(key, fallback);
      }
      return JSON.parse(item);
    } catch {
      return this.getFromMemory(key, fallback);
    }
  }

  setItem(key, value) {
    const serialized = JSON.stringify(value);
    try {
      if (!this.storage) {
        this.inMemoryFallback.set(key, serialized);
        return false;
      }
      this.storage.setItem(key, serialized);
      this.inMemoryFallback.set(key, serialized);
      return true;
    } catch {
      this.inMemoryFallback.set(key, serialized);
      return false;
    }
  }

  removeItem(key) {
    try {
      if (this.storage) {
        this.storage.removeItem(key);
      }
    } catch {
      // Ignore errors on remove
    }
    this.inMemoryFallback.delete(key);
  }

  getFromMemory(key, fallback) {
    if (this.inMemoryFallback.has(key)) {
      try {
        return JSON.parse(this.inMemoryFallback.get(key));
      } catch {
        return fallback;
      }
    }
    return fallback;
  }
}
