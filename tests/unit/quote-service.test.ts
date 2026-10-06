import { describe, it, expect } from "vitest";
import { QuoteService } from "../../src/services/quote-service.js";
import { Quote } from "../../src/models/quote.js";

const sampleQuotes: ReadonlyArray<Quote> = [
  { id: "q-1", text: "Quote One", author: "Author One" },
  { id: "q-2", text: "Quote Two", author: "Author Two" },
  { id: "q-3", text: "Quote Three", author: "Author Three" },
];

describe("QuoteService - User Story 1 & 2", () => {
  it("initializes with provided quotes and retrieves all quotes", () => {
    const service = new QuoteService(sampleQuotes);
    expect(service.getAllQuotes().length).toBe(3);
    expect(service.getAllQuotes()).toEqual(sampleQuotes);
  });

  it("throws an error when initialized with an empty quotes array", () => {
    expect(() => new QuoteService([])).toThrow("QuoteService requires at least one quote");
  });

  it("returns a valid quote from the collection on getRandomQuote()", () => {
    const service = new QuoteService(sampleQuotes);
    const quote = service.getRandomQuote();

    expect(sampleQuotes.some((q) => q.id === quote.id)).toBe(true);
    expect(quote.text).toBeDefined();
    expect(quote.author).toBeDefined();
  });

  it("finds a quote by ID correctly", () => {
    const service = new QuoteService(sampleQuotes);
    const quote = service.getQuoteById("q-2");

    expect(quote).toBeDefined();
    expect(quote?.text).toBe("Quote Two");
    expect(service.getQuoteById("non-existent")).toBeUndefined();
  });

  describe("Non-repeating random selection (US2)", () => {
    it("never returns the excluded quote when collection has multiple quotes", () => {
      const service = new QuoteService(sampleQuotes);

      // Run multiple iterations to verify non-repetition property
      for (let i = 0; i < 30; i++) {
        const nextQuote = service.getRandomQuote("q-1");
        expect(nextQuote.id).not.toBe("q-1");
        expect(["q-2", "q-3"]).toContain(nextQuote.id);
      }
    });

    it("returns the single quote if collection only has 1 quote (single-item boundary)", () => {
      const singleQuote: ReadonlyArray<Quote> = [{ id: "solo", text: "Solo quote", author: "Solo" }];
      const service = new QuoteService(singleQuote);

      const nextQuote = service.getRandomQuote("solo");
      expect(nextQuote.id).toBe("solo");
    });
  });
});
