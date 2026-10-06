import { describe, it, expect, beforeEach } from "vitest";
import { bootstrapApp } from "../../src/main.js";
import { FAVORITES_STORAGE_KEY } from "../../src/models/favorite-state.js";

describe("Application Bootstrap & E2E Flow", () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = `
      <section class="quote-card" data-testid="quote-card">
        <blockquote class="quote-text" data-testid="quote-text"></blockquote>
        <cite class="quote-author" data-testid="quote-author"></cite>
        <button class="btn btn-favorite" data-testid="favorite-btn" aria-pressed="false">
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
    const app = bootstrapApp();
    const quote1 = app.getCurrentQuote();
    expect(quote1).not.toBeNull();

    const quoteTextEl = document.querySelector('[data-testid="quote-text"]') as HTMLElement;
    const quoteAuthorEl = document.querySelector('[data-testid="quote-author"]') as HTMLElement;
    const favoriteBtn = document.querySelector('[data-testid="favorite-btn"]') as HTMLButtonElement;
    const newQuoteBtn = document.querySelector('[data-testid="new-quote-btn"]') as HTMLButtonElement;

    expect(quoteTextEl.textContent).toBe(quote1!.text);
    expect(quoteAuthorEl.textContent).toBe(`— ${quote1!.author}`);
    expect(favoriteBtn.getAttribute("aria-pressed")).toBe("false");

    // 2. Click "New quote"
    newQuoteBtn.click();
    const quote2 = app.getCurrentQuote();
    expect(quote2).not.toBeNull();
    expect(quote2!.id).not.toBe(quote1!.id);
    expect(quoteTextEl.textContent).toBe(quote2!.text);

    // 3. Click "Favorite"
    favoriteBtn.click();
    expect(favoriteBtn.getAttribute("aria-pressed")).toBe("true");
    expect(favoriteBtn.classList.contains("is-favorited")).toBe(true);
    expect(app.favoriteService.isFavorite(quote2!.id)).toBe(true);

    // Verify localStorage content
    const rawStored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    expect(rawStored).toContain(quote2!.id);

    // 4. Simulate reload by creating a new bootstrapApp session
    const reloadedApp = bootstrapApp();
    // Verify that the favorited quote is recognized as favorited
    expect(reloadedApp.favoriteService.isFavorite(quote2!.id)).toBe(true);
  });
});
