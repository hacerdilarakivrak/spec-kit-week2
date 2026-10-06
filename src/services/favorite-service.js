import { FAVORITES_STORAGE_KEY } from "../models/favorite-state.js";

/**
 * FavoriteService manages in-memory favorites and synchronizes with localStorage.
 */
export class FavoriteService {
  constructor(storage) {
    this.storage = storage;
    this.favoriteIds = this.loadFavorites();
  }

  loadFavorites() {
    try {
      const stored = this.storage.getItem(FAVORITES_STORAGE_KEY, []);
      if (Array.isArray(stored)) {
        const validIds = stored.filter(
          (id) => typeof id === "string" && id.trim().length > 0
        );
        return new Set(validIds);
      }
      return new Set();
    } catch {
      return new Set();
    }
  }

  persist() {
    const idsArray = Array.from(this.favoriteIds);
    this.storage.setItem(FAVORITES_STORAGE_KEY, idsArray);
  }

  getFavoriteIds() {
    return new Set(this.favoriteIds);
  }

  isFavorite(quoteId) {
    return this.favoriteIds.has(quoteId);
  }

  toggleFavorite(quoteId) {
    let nowFavorited;

    if (this.favoriteIds.has(quoteId)) {
      this.favoriteIds.delete(quoteId);
      nowFavorited = false;
    } else {
      this.favoriteIds.add(quoteId);
      nowFavorited = true;
    }

    this.persist();
    return nowFavorited;
  }
}
