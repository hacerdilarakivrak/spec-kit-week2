/**
 * QuoteService implementation in plain JavaScript.
 */
export class QuoteService {
  constructor(quotes) {
    if (!quotes || quotes.length === 0) {
      throw new Error("QuoteService requires at least one quote");
    }
    this.quotes = quotes;
  }

  getAllQuotes() {
    return this.quotes;
  }

  getRandomQuote(excludeId) {
    if (this.quotes.length === 1) {
      return this.quotes[0];
    }

    const eligible = excludeId
      ? this.quotes.filter((q) => q.id !== excludeId)
      : this.quotes;

    const pool = eligible.length > 0 ? eligible : this.quotes;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  }

  getQuoteById(id) {
    return this.quotes.find((q) => q.id === id);
  }
}
