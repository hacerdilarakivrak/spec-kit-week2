import { describe, it, expect, beforeEach } from "vitest";
import { FavoriteService } from "../../src/services/favorite-service.js";
import { StorageService } from "../../src/services/storage-service.js";
import { FAVORITES_STORAGE_KEY } from "../../src/models/favorite-state.js";

describe("FavoriteService - User Story 3", () => {
  let storage: StorageService;
  let favoriteService: FavoriteService;

  beforeEach(() => {
    localStorage.clear();
    storage = new StorageService();
    favoriteService = new FavoriteService(storage);
  });

  it("initializes with empty favorites if nothing in storage", () => {
    expect(favoriteService.getFavoriteIds().size).toBe(0);
    expect(favoriteService.isFavorite("q-01")).toBe(false);
  });

  it("toggles favorite state on and off, updating storage immediately", () => {
    // 1. Toggle ON
    const state1 = favoriteService.toggleFavorite("q-01");
    expect(state1).toBe(true);
    expect(favoriteService.isFavorite("q-01")).toBe(true);
    expect(favoriteService.getFavoriteIds().has("q-01")).toBe(true);

    // Verify stored data
    const stored = storage.getItem<string[]>(FAVORITES_STORAGE_KEY, []);
    expect(stored).toEqual(["q-01"]);

    // 2. Toggle OFF
    const state2 = favoriteService.toggleFavorite("q-01");
    expect(state2).toBe(false);
    expect(favoriteService.isFavorite("q-01")).toBe(false);
    expect(favoriteService.getFavoriteIds().has("q-01")).toBe(false);

    // Verify updated storage
    const storedAfter = storage.getItem<string[]>(FAVORITES_STORAGE_KEY, []);
    expect(storedAfter).toEqual([]);
  });

  it("restores previously saved favorites on initialization (reload persistence)", () => {
    storage.setItem(FAVORITES_STORAGE_KEY, ["q-01", "q-05"]);

    const newServiceInstance = new FavoriteService(storage);
    expect(newServiceInstance.isFavorite("q-01")).toBe(true);
    expect(newServiceInstance.isFavorite("q-05")).toBe(true);
    expect(newServiceInstance.isFavorite("q-02")).toBe(false);
  });

  it("handles corrupted non-array data in storage gracefully without throwing", () => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify("not-an-array"));

    const resilientService = new FavoriteService(storage);
    expect(resilientService.getFavoriteIds().size).toBe(0);
    expect(resilientService.isFavorite("q-01")).toBe(false);
  });
});
