import { describe, it, expect, beforeEach } from "vitest";
import { QuoteView } from "../../src/ui/quote-view.js";
import { Quote } from "../../src/models/quote.js";

const mockQuote: Quote = {
  id: "q-100",
  text: "Integration test quote text.",
  author: "Integration Author",
};

const mockQuote2: Quote = {
  id: "q-101",
  text: "Second quote for testing.",
  author: "Second Author",
};

describe("QuoteView Integration - User Stories 1, 2, & 3", () => {
  let container: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <section data-testid="quote-card">
        <blockquote data-testid="quote-text"></blockquote>
        <cite data-testid="quote-author"></cite>
        <button data-testid="favorite-btn" aria-pressed="false">
          <span data-testid="favorite-icon">★</span>
          <span class="favorite-text">Favorite</span>
        </button>
        <button data-testid="new-quote-btn">New quote</button>
      </section>
      <div id="status-announcer" aria-live="polite"></div>
    `;
    container = document.body;
  });

  it("renders a quote and author into DOM elements matching contracts (US1)", () => {
    const view = new QuoteView(container);
    view.renderQuote(mockQuote, false);

    const textEl = container.querySelector('[data-testid="quote-text"]') as HTMLElement;
    const authorEl = container.querySelector('[data-testid="quote-author"]') as HTMLElement;
    const favBtn = container.querySelector('[data-testid="favorite-btn"]') as HTMLButtonElement;

    expect(textEl.textContent?.trim()).toBe("Integration test quote text.");
    expect(authorEl.textContent?.trim()).toBe("— Integration Author");
    expect(favBtn.getAttribute("aria-pressed")).toBe("false");
    expect(favBtn.getAttribute("aria-label")).toBe("Add quote to favorites");
    expect(favBtn.classList.contains("is-favorited")).toBe(false);
  });

  it("renders quote as favorited when isFavorite is true (US1 & US3)", () => {
    const view = new QuoteView(container);
    view.renderQuote(mockQuote, true);

    const favBtn = container.querySelector('[data-testid="favorite-btn"]') as HTMLButtonElement;
    expect(favBtn.getAttribute("aria-pressed")).toBe("true");
    expect(favBtn.getAttribute("aria-label")).toBe("Remove quote from favorites");
    expect(favBtn.classList.contains("is-favorited")).toBe(true);
  });

  it("invokes callback when 'New quote' button is clicked (US2)", () => {
    const view = new QuoteView(container);
    let newQuoteClicked = false;

    view.bindNewQuote(() => {
      newQuoteClicked = true;
      view.renderQuote(mockQuote2, false);
    });

    const newBtn = container.querySelector('[data-testid="new-quote-btn"]') as HTMLButtonElement;
    newBtn.click();

    expect(newQuoteClicked).toBe(true);
    const textEl = container.querySelector('[data-testid="quote-text"]') as HTMLElement;
    expect(textEl.textContent?.trim()).toBe("Second quote for testing.");
  });

  it("invokes callback and updates UI when favorite button is clicked (US3)", () => {
    const view = new QuoteView(container);
    let isFav = false;
    let toggleClicked = false;

    view.renderQuote(mockQuote, isFav);

    view.bindToggleFavorite(() => {
      toggleClicked = true;
      isFav = !isFav;
      view.updateFavoriteState(isFav);
    });

    const favBtn = container.querySelector('[data-testid="favorite-btn"]') as HTMLButtonElement;

    // First click: favorite
    favBtn.click();
    expect(toggleClicked).toBe(true);
    expect(favBtn.getAttribute("aria-pressed")).toBe("true");
    expect(favBtn.getAttribute("aria-label")).toBe("Remove quote from favorites");
    expect(favBtn.classList.contains("is-favorited")).toBe(true);
    expect(favBtn.querySelector(".favorite-text")?.textContent).toBe("Favorited");

    // Second click: unfavorite
    favBtn.click();
    expect(favBtn.getAttribute("aria-pressed")).toBe("false");
    expect(favBtn.getAttribute("aria-label")).toBe("Add quote to favorites");
    expect(favBtn.classList.contains("is-favorited")).toBe(false);
    expect(favBtn.querySelector(".favorite-text")?.textContent).toBe("Favorite");
  });
});
