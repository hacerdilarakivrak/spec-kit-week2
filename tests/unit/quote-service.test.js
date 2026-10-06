import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { QuoteService } from "../../src/services/quote-service.js";

const sampleQuotes = [
  { id: "q-1", text: "Quote One", author: "Author One" },
  { id: "q-2", text: "Quote Two", author: "Author Two" },
  { id: "q-3", text: "Quote Three", author: "Author Three" },
];

describe("QuoteService - User Story 1 & 2 (Plain JavaScript)", () => {
  it("initializes with provided quotes and retrieves all quotes", () => {
    const service = new QuoteService(sampleQuotes);
    assert.equal(service.getAllQuotes().length, 3);
    assert.deepEqual(service.getAllQuotes(), sampleQuotes);
  });

  it("throws an error when initialized with an empty quotes array", () => {
    assert.throws(
      () => new QuoteService([]),
      /QuoteService requires at least one quote/
    );
  });

  it("returns a valid quote from the collection on getRandomQuote()", () => {
    const service = new QuoteService(sampleQuotes);
    const quote = service.getRandomQuote();

    assert.equal(sampleQuotes.some((q) => q.id === quote.id), true);
    assert.ok(quote.text);
    assert.ok(quote.author);
  });

  it("finds a quote by ID correctly", () => {
    const service = new QuoteService(sampleQuotes);
    const quote = service.getQuoteById("q-2");

    assert.ok(quote);
    assert.equal(quote.text, "Quote Two");
    assert.equal(service.getQuoteById("non-existent"), undefined);
  });

  describe("Non-repeating random selection (US2)", () => {
    it("never returns the excluded quote when collection has multiple quotes", () => {
      const service = new QuoteService(sampleQuotes);

      for (let i = 0; i < 30; i++) {
        const nextQuote = service.getRandomQuote("q-1");
        assert.notEqual(nextQuote.id, "q-1");
        assert.ok(["q-2", "q-3"].includes(nextQuote.id));
      }
    });

    it("returns the single quote if collection only has 1 quote (single-item boundary)", () => {
      const singleQuote = [{ id: "solo", text: "Solo quote", author: "Solo" }];
      const service = new QuoteService(singleQuote);

      const nextQuote = service.getRandomQuote("solo");
      assert.equal(nextQuote.id, "solo");
    });
  });
});
