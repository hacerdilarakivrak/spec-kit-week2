import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { Window } from "happy-dom";
import { bootstrapApp } from "../../src/main.js";
import { FAVORITES_STORAGE_KEY } from "../../src/models/favorite-state.js";

describe("Application Bootstrap & E2E Flow (Plain JavaScript)", () => {
  let window;
  let document;

  beforeEach(() => {
    window = new Window();
    document = window.document;
    globalThis.window = window;
    globalThis.document = document;
    globalThis.localStorage = window.localStorage;

    document.body.innerHTML = `
      <section class="quote-card" data-testid="quote-card">
        <blockquote class="quote-text" data-testid="quote-text"></blockquote>
        <cite class="quote-author" data-testid="quote-author"></cite>
        <button class="btn btn-favorite" data-testid="favorite-btn" aria-pressed="false" aria-label="Add quote to favorites">
          <span class="favorite-icon" data-testid="favorite-icon">★</span>
          <span class="favorite-text">Favorite</span>
        </button>
        <button class="btn btn-primary" data-testid="new-quote-btn">New quote</button>
      </section>
      <div id="status-announcer" aria-live="polite"></div>
    `;
  });

  it("completes full lifecycle: initial display -> new quote -> favorite -> persistence", () => {
    // 1. Initial application bootstrap
    const app = bootstrapApp(document);
    const quote1 = app.getCurrentQuote();
    assert.ok(quote1);

    const quoteTextEl = document.querySelector('[data-testid="quote-text"]');
    const quoteAuthorEl = document.querySelector('[data-testid="quote-author"]');
    const favoriteBtn = document.querySelector('[data-testid="favorite-btn"]');
    const newQuoteBtn = document.querySelector('[data-testid="new-quote-btn"]');

    assert.equal(quoteTextEl.textContent, quote1.text);
    assert.equal(quoteAuthorEl.textContent, `— ${quote1.author}`);
    assert.equal(favoriteBtn.getAttribute("aria-pressed"), "false");
    assert.equal(favoriteBtn.getAttribute("aria-label"), "Add quote to favorites");

    // 2. Click "New quote"
    newQuoteBtn.click();
    const quote2 = app.getCurrentQuote();
    assert.ok(quote2);
    assert.notEqual(quote2.id, quote1.id);
    assert.equal(quoteTextEl.textContent, quote2.text);

    // 3. Click "Favorite"
    favoriteBtn.click();
    assert.equal(favoriteBtn.getAttribute("aria-pressed"), "true");
    assert.equal(favoriteBtn.getAttribute("aria-label"), "Remove quote from favorites");
    assert.equal(favoriteBtn.classList.contains("is-favorited"), true);
    assert.equal(app.favoriteService.isFavorite(quote2.id), true);

    // Verify localStorage content
    const rawStored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    assert.ok(rawStored.includes(quote2.id));

    // 4. Simulate reload by creating a new bootstrapApp session
    const reloadedApp = bootstrapApp(document);
    assert.equal(reloadedApp.favoriteService.isFavorite(quote2.id), true);
  });
});
