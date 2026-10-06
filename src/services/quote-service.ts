import { Quote } from "../models/quote.js";

export interface IQuoteService {
  getAllQuotes(): ReadonlyArray<Quote>;
  getRandomQuote(excludeId?: string): Quote;
  getQuoteById(id: string): Quote | undefined;
}

export class QuoteService implements IQuoteService {
  private readonly quotes: ReadonlyArray<Quote>;

  constructor(quotes: ReadonlyArray<Quote>) {
    if (!quotes || quotes.length === 0) {
      throw new Error("QuoteService requires at least one quote");
    }
    this.quotes = quotes;
  }

  getAllQuotes(): ReadonlyArray<Quote> {
    return this.quotes;
  }

  getRandomQuote(excludeId?: string): Quote {
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

  getQuoteById(id: string): Quote | undefined {
    return this.quotes.find((q) => q.id === id);
  }
}
