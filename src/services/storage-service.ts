import { IStorageService } from "../models/favorite-state.js";

/**
 * Resilient implementation of IStorageService with automatic in-memory fallback.
 * Guarantees zero crashes if browser storage is blocked, unavailable, or throws.
 */
export class StorageService implements IStorageService {
  private inMemoryFallback: Map<string, string> = new Map();
  private storage: Storage | null = null;

  constructor(customStorage?: Storage) {
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

  getItem<T>(key: string, fallback: T): T {
    try {
      if (!this.storage) {
        return this.getFromMemory(key, fallback);
      }
      const item = this.storage.getItem(key);
      if (item === null) {
        return this.getFromMemory(key, fallback);
      }
      return JSON.parse(item) as T;
    } catch {
      return this.getFromMemory(key, fallback);
    }
  }

  setItem<T>(key: string, value: T): boolean {
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
      // Gracefully persist to in-memory store
      this.inMemoryFallback.set(key, serialized);
      return false;
    }
  }

  removeItem(key: string): void {
    try {
      if (this.storage) {
        this.storage.removeItem(key);
      }
    } catch {
      // Ignore storage errors on remove
    }
    this.inMemoryFallback.delete(key);
  }

  private getFromMemory<T>(key: string, fallback: T): T {
    if (this.inMemoryFallback.has(key)) {
      try {
        return JSON.parse(this.inMemoryFallback.get(key)!) as T;
      } catch {
        return fallback;
      }
    }
    return fallback;
  }
}
