import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { StorageService } from "../../src/services/storage-service.js";

describe("StorageService (Plain JavaScript)", () => {
  let mockStorage;
  let storeData;

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
  });

  it("returns fallback value when item does not exist", () => {
    const storage = new StorageService(mockStorage);
    const result = storage.getItem("non_existent_key", ["default"]);
    assert.deepEqual(result, ["default"]);
  });

  it("stores and retrieves JSON serializable data correctly", () => {
    const storage = new StorageService(mockStorage);
    const success = storage.setItem("test_key", ["q-01", "q-02"]);
    assert.equal(success, true);

    const retrieved = storage.getItem("test_key", []);
    assert.deepEqual(retrieved, ["q-01", "q-02"]);
  });

  it("removes items from storage", () => {
    const storage = new StorageService(mockStorage);
    storage.setItem("key_to_remove", "sample_value");
    storage.removeItem("key_to_remove");

    const retrieved = storage.getItem("key_to_remove", "default");
    assert.equal(retrieved, "default");
  });

  it("gracefully falls back when stored value is corrupted JSON", () => {
    mockStorage.setItem("corrupted_key", "{not valid json");
    const storage = new StorageService(mockStorage);

    const retrieved = storage.getItem("corrupted_key", ["fallback_val"]);
    assert.deepEqual(retrieved, ["fallback_val"]);
  });

  it("falls back to in-memory store when storage throws an error", () => {
    const throwingStorage = {
      getItem: () => null,
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
      removeItem: () => {},
    };

    const mockService = new StorageService(throwingStorage);

    const success = mockService.setItem("mem_key", ["fallback_memory"]);
    assert.equal(success, false);

    const value = mockService.getItem("mem_key", []);
    assert.deepEqual(value, ["fallback_memory"]);
  });

  it("works purely in-memory if storage is null", () => {
    const memoryOnlyService = new StorageService(null);
    memoryOnlyService.setItem("session_key", ["item1", "item2"]);

    assert.deepEqual(memoryOnlyService.getItem("session_key", []), ["item1", "item2"]);
  });
});
