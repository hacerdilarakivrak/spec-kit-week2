/**
 * Interface contract for client-side persistence and favorites state.
 */

export interface IStorageService {
  /**
   * Retrieves an item from storage.
   * Gracefully returns fallback value if storage fails or item does not exist.
   */
  getItem<T>(key: string, fallback: T): T;

  /**
   * Saves an item to storage.
   * Catches and suppresses errors (e.g., quota exceeded, storage disabled).
   */
  setItem<T>(key: string, value: T): boolean;

  /**
   * Removes an item from storage.
   */
  removeItem(key: string): void;
}

export interface IFavoriteService {
  /**
   * Returns a copy or readonly set of all favorited quote IDs.
   */
  getFavoriteIds(): ReadonlySet<string>;

  /**
   * Checks whether a specific quote is currently marked as favorite.
   */
  isFavorite(quoteId: string): boolean;

  /**
   * Toggles the favorite status for a given quote.
   * Persists the update immediately to storage.
   *
   * @param quoteId Identifier of the quote to toggle
   * @returns true if now favorited, false if unfavorited
   */
  toggleFavorite(quoteId: string): boolean;
}
