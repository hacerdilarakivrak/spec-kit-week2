import { describe, it, expect, beforeEach } from "vitest";
import { StorageService } from "../../src/services/storage-service.js";

describe("StorageService", () => {
  let storage: StorageService;

  beforeEach(() => {
    localStorage.clear();
    storage = new StorageService();
  });

  it("returns fallback value when item does not exist", () => {
    const result = storage.getItem("non_existent_key", ["default"]);
    expect(result).toEqual(["default"]);
  });

  it("stores and retrieves JSON serializable data correctly", () => {
    const success = storage.setItem("test_key", ["q-01", "q-02"]);
    expect(success).toBe(true);

    const retrieved = storage.getItem<string[]>("test_key", []);
    expect(retrieved).toEqual(["q-01", "q-02"]);
  });

  it("removes items from storage", () => {
    storage.setItem("key_to_remove", "sample_value");
    storage.removeItem("key_to_remove");

    const retrieved = storage.getItem("key_to_remove", "default");
    expect(retrieved).toBe("default");
  });

  it("gracefully falls back when stored value is corrupted JSON", () => {
    localStorage.setItem("corrupted_key", "{not valid json");

    const retrieved = storage.getItem("corrupted_key", ["fallback_val"]);
    expect(retrieved).toEqual(["fallback_val"]);
  });

  it("falls back to in-memory store when storage throws an error", () => {
    // Mock storage where setItem throws
    const throwingStorage = {
      getItem: () => null,
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0,
    } as unknown as Storage;

    const mockService = new StorageService(throwingStorage);

    // setItem should catch error, store in memory fallback, and return false
    const success = mockService.setItem("mem_key", ["fallback_memory"]);
    expect(success).toBe(false);

    // getItem should retrieve value from in-memory fallback
    const value = mockService.getItem("mem_key", []);
    expect(value).toEqual(["fallback_memory"]);
  });

  it("works purely in-memory if storage is null", () => {
    const memoryOnlyService = new StorageService(null as unknown as Storage);
    memoryOnlyService.setItem("session_key", ["item1", "item2"]);

    expect(memoryOnlyService.getItem("session_key", [])).toEqual(["item1", "item2"]);
  });
});
