/**
 * Plain JavaScript interface contracts for StorageService and FavoriteService.
 */

/**
 * Expected interface methods for StorageService:
 *
 * - getItem(key, fallback)
 *   Retrieves and parses JSON item from localStorage.
 *   Returns fallback if item does not exist or access throws.
 *
 * - setItem(key, value)
 *   Serializes and stores value to localStorage.
 *   Returns true if saved successfully; falls back to in-memory store and returns false if throws.
 *
 * - removeItem(key)
 *   Removes item from localStorage and in-memory fallback.
 */

/**
 * Expected interface methods for FavoriteService:
 *
 * - getFavoriteIds(): Set<string>
 *   Returns set of favorited quote IDs.
 *
 * - isFavorite(quoteId: string): boolean
 *   Returns true if quoteId is in favorites; otherwise false.
 *
 * - toggleFavorite(quoteId: string): boolean
 *   Toggles favorite status, immediately synchronizes with localStorage, and returns new state.
 */
