/**
 * Quote model definition and validation.
 */

export interface Quote {
  readonly id: string;
  readonly text: string;
  readonly author: string;
}

/**
 * Validates a Quote object according to specification constraints:
 * - 'id': non-empty string
 * - 'text': string with length >= 3
 * - 'author': non-empty string (trimmed)
 *
 * @throws Error if any validation rule is violated
 */
export function validateQuote(candidate: unknown): Quote {
  if (!candidate || typeof candidate !== "object") {
    throw new Error("Quote must be a non-null object");
  }

  const { id, text, author } = candidate as Partial<Quote>;

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
