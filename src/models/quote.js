/**
 * Quote model definition and validation (Plain JavaScript).
 *
 * @typedef {Object} Quote
 * @property {string} id - Unique identifier (non-empty string)
 * @property {string} text - Quote text content (length >= 3)
 * @property {string} author - Author name (non-empty string)
 */

/**
 * Validates a Quote object according to specification constraints:
 * - 'id': non-empty string
 * - 'text': string with length >= 3
 * - 'author': non-empty string (trimmed)
 *
 * @param {unknown} candidate
 * @returns {Quote}
 * @throws {Error} if any validation rule is violated
 */
export function validateQuote(candidate) {
  if (!candidate || typeof candidate !== "object") {
    throw new Error("Quote must be a non-null object");
  }

  const { id, text, author } = candidate;

  if (typeof id !== "string" || id.trim().length === 0) {
    throw new Error("Quote 'id' must be a non-empty string");
  }

  if (typeof text !== "string" || text.trim().length < 3) {
    throw new Error("Quote 'text' must be a string with length >= 3 characters");
  }

  if (typeof author !== "string" || author.trim().length === 0) {
    throw new Error("Quote 'author' must be a non-empty string");
  }

  return {
    id: id.trim(),
    text: text.trim(),
    author: author.trim(),
  };
}
