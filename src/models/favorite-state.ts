/**
 * FavoriteState models and storage contract definitions.
 */

export interface FavoriteState {
  readonly favoritedQuoteIds: ReadonlySet<string>;
}

export interface IStorageService {
  getItem<T>(key: string, fallback: T): T;
  setItem<T>(key: string, value: T): boolean;
  removeItem(key: string): void;
}

export const FAVORITES_STORAGE_KEY = "quote_of_the_day_favorites";
