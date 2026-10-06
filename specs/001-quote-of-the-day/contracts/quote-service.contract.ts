/**
 * Interface contract for Quote Service operations.
 */

export interface Quote {
  readonly id: string;
  readonly text: string;
  readonly author: string;
}

export interface IQuoteService {
  /**
   * Retrieves all quotes currently configured in the service.
   */
  getAllQuotes(): ReadonlyArray<Quote>;

  /**
   * Selects a quote at random from the collection.
   * If `excludeId` is provided and the collection contains more than one quote,
   * the returned quote MUST NOT have an id matching `excludeId`.
   * If the collection contains only one quote, that single quote is returned.
   *
   * @param excludeId Optional ID of the quote currently displayed
   * @returns A randomly selected Quote
   * @throws Error if the quotes collection is empty
   */
  getRandomQuote(excludeId?: string): Quote;

  /**
   * Retrieves a quote by its identifier.
   *
   * @param id The unique identifier of the quote
   * @returns The matching Quote or undefined if not found
   */
  getQuoteById(id: string): Quote | undefined;
}
