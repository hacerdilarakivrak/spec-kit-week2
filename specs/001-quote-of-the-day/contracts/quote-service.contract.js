/**
 * Plain JavaScript interface contract for QuoteService.
 *
 * @typedef {Object} Quote
 * @property {string} id
 * @property {string} text
 * @property {string} author
 */

/**
 * Expected interface methods for QuoteService:
 *
 * - getAllQuotes(): Quote[]
 *   Returns all quotes configured in the service.
 *
 * - getRandomQuote(excludeId?: string): Quote
 *   Returns a randomly selected Quote from the collection.
 *   If excludeId is provided and collection size > 1, the returned quote MUST NOT match excludeId.
 *   If collection size === 1, returns that single quote.
 *   Throws an Error if collection is empty.
 *
 * - getQuoteById(id: string): Quote | undefined
 *   Returns the matching quote or undefined if not found.
 */
