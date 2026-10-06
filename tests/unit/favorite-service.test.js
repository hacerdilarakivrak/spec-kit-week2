import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { FavoriteService } from "../../src/services/favorite-service.js";
import { StorageService } from "../../src/services/storage-service.js";
import { FAVORITES_STORAGE_KEY } from "../../src/models/favorite-state.js";

describe("FavoriteService (Plain JavaScript)", () => {
  let mockStorage;
  let storeData;
  let storageService;
  let favoriteService;

  beforeEach(() => {
    storeData = new Map();
    mockStorage = {
      getItem: (key) => (storeData.has(key) ? storeData.get(key) : null),
      setItem: (key, val) => {
        storeData.set(key, String(val));
      },
      removeItem: (key) => {
        storeData.delete(key);
      },
    };
    storageService = new StorageService(mockStorage);
    favoriteService = new FavoriteService(storageService);
  });

  it("initializes with empty favorites if nothing in storage", () => {
    assert.equal(favoriteService.getFavoriteIds().size, 0);
    assert.equal(favoriteService.isFavorite("q-01"), false);
  });

  it("toggles favorite state on and off, updating storage immediately", () => {
    // 1. Toggle ON
    const state1 = favoriteService.toggleFavorite("q-01");
    assert.equal(state1, true);
    assert.equal(favoriteService.isFavorite("q-01"), true);
    assert.equal(favoriteService.getFavoriteIds().has("q-01"), true);

    const stored = storageService.getItem(FAVORITES_STORAGE_KEY, []);
    assert.deepEqual(stored, ["q-01"]);

    // 2. Toggle OFF
    const state2 = favoriteService.toggleFavorite("q-01");
    assert.equal(state2, false);
    assert.equal(favoriteService.isFavorite("q-01"), false);
    assert.equal(favoriteService.getFavoriteIds().has("q-01"), false);

    const storedAfter = storageService.getItem(FAVORITES_STORAGE_KEY, []);
    assert.deepEqual(storedAfter, []);
  });

  it("restores previously saved favorites on initialization (reload persistence)", () => {
    storageService.setItem(FAVORITES_STORAGE_KEY, ["q-01", "q-05"]);

    const newService = new FavoriteService(storageService);
    assert.equal(newService.isFavorite("q-01"), true);
    assert.equal(newService.isFavorite("q-05"), true);
    assert.equal(newService.isFavorite("q-02"), false);
  });

  it("handles corrupted non-array data in storage gracefully without throwing", () => {
    mockStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify("not-an-array"));

    const resilientService = new FavoriteService(storageService);
    assert.equal(resilientService.getFavoriteIds().size, 0);
    assert.equal(resilientService.isFavorite("q-01"), false);
  });
});
