import { IStorageService, FAVORITES_STORAGE_KEY } from "../models/favorite-state.js";

export interface IFavoriteService {
  getFavoriteIds(): ReadonlySet<string>;
  isFavorite(quoteId: string): boolean;
  toggleFavorite(quoteId: string): boolean;
}

export class FavoriteService implements IFavoriteService {
  private readonly storage: IStorageService;
  private readonly favoriteIds: Set<string>;

  constructor(storage: IStorageService) {
    this.storage = storage;
    this.favoriteIds = this.loadFavorites();
  }

  private loadFavorites(): Set<string> {
    try {
      const stored = this.storage.getItem<unknown>(FAVORITES_STORAGE_KEY, []);
      if (Array.isArray(stored)) {
        const validIds = stored.filter(
          (id): id is string => typeof id === "string" && id.trim().length > 0
        );
        return new Set(validIds);
      }
      return new Set();
    } catch {
      return new Set();
    }
  }

  private persist(): void {
    const idsArray = Array.from(this.favoriteIds);
    this.storage.setItem(FAVORITES_STORAGE_KEY, idsArray);
  }

  getFavoriteIds(): ReadonlySet<string> {
    return new Set(this.favoriteIds);
  }

  isFavorite(quoteId: string): boolean {
    return this.favoriteIds.has(quoteId);
  }

  toggleFavorite(quoteId: string): boolean {
    let nowFavorited: boolean;

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
