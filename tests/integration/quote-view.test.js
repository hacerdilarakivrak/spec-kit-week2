import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { Window } from "happy-dom";
import { QuoteView } from "../../src/ui/quote-view.js";

const mockQuote = {
  id: "q-100",
  text: "Integration test quote text.",
  author: "Integration Author",
};

const mockQuote2 = {
  id: "q-101",
  text: "Second quote for testing.",
  author: "Second Author",
};

describe("QuoteView Integration (Plain JavaScript)", () => {
  let window;
  let document;

  beforeEach(() => {
    window = new Window();
    document = window.document;
    document.body.innerHTML = `
      <section data-testid="quote-card">
        <blockquote data-testid="quote-text"></blockquote>
        <cite data-testid="quote-author"></cite>
        <button data-testid="favorite-btn" aria-pressed="false" aria-label="Add quote to favorites">
          <span data-testid="favorite-icon">★</span>
          <span class="favorite-text">Favorite</span>
        </button>
        <button data-testid="new-quote-btn">New quote</button>
      </section>
      <div id="status-announcer" aria-live="polite"></div>
    `;
  });

  it("renders a quote and author into DOM elements matching contracts (US1)", () => {
    const view = new QuoteView(document);
    view.renderQuote(mockQuote, false);

    const textEl = document.querySelector('[data-testid="quote-text"]');
    const authorEl = document.querySelector('[data-testid="quote-author"]');
    const favBtn = document.querySelector('[data-testid="favorite-btn"]');

    assert.equal(textEl.textContent.trim(), "Integration test quote text.");
    assert.equal(authorEl.textContent.trim(), "— Integration Author");
    assert.equal(favBtn.getAttribute("aria-pressed"), "false");
    assert.equal(favBtn.getAttribute("aria-label"), "Add quote to favorites");
    assert.equal(favBtn.classList.contains("is-favorited"), false);
  });

  it("renders quote as favorited when isFavorite is true (US1 & US3)", () => {
    const view = new QuoteView(document);
    view.renderQuote(mockQuote, true);

    const favBtn = document.querySelector('[data-testid="favorite-btn"]');
    assert.equal(favBtn.getAttribute("aria-pressed"), "true");
    assert.equal(favBtn.getAttribute("aria-label"), "Remove quote from favorites");
    assert.equal(favBtn.classList.contains("is-favorited"), true);
  });

  it("invokes callback when 'New quote' button is clicked (US2)", () => {
    const view = new QuoteView(document);
    let newQuoteClicked = false;

    view.bindNewQuote(() => {
      newQuoteClicked = true;
      view.renderQuote(mockQuote2, false);
    });

    const newBtn = document.querySelector('[data-testid="new-quote-btn"]');
    newBtn.click();

    assert.equal(newQuoteClicked, true);
    const textEl = document.querySelector('[data-testid="quote-text"]');
    assert.equal(textEl.textContent.trim(), "Second quote for testing.");
  });

  it("invokes callback and toggles visual states and aria-label when favorite is clicked (US3)", () => {
    const view = new QuoteView(document);
    let isFav = false;
    let toggleClicked = false;

    view.renderQuote(mockQuote, isFav);

    view.bindToggleFavorite(() => {
      toggleClicked = true;
      isFav = !isFav;
      view.updateFavoriteState(isFav);
    });

    const favBtn = document.querySelector('[data-testid="favorite-btn"]');

    // First click: favorite
    favBtn.click();
    assert.equal(toggleClicked, true);
    assert.equal(favBtn.getAttribute("aria-pressed"), "true");
    assert.equal(favBtn.getAttribute("aria-label"), "Remove quote from favorites");
    assert.equal(favBtn.classList.contains("is-favorited"), true);
    assert.equal(favBtn.querySelector(".favorite-text").textContent, "Favorited");

    // Second click: unfavorite
    favBtn.click();
    assert.equal(favBtn.getAttribute("aria-pressed"), "false");
    assert.equal(favBtn.getAttribute("aria-label"), "Add quote to favorites");
    assert.equal(favBtn.classList.contains("is-favorited"), false);
    assert.equal(favBtn.querySelector(".favorite-text").textContent, "Favorite");
  });
});
