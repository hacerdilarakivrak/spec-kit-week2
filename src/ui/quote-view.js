/**
 * QuoteView manages DOM rendering, button interactions, accessibility labels, and live announcements.
 */
export class QuoteView {
  constructor(root = document) {
    this.quoteTextEl = root.querySelector('[data-testid="quote-text"]');
    this.quoteAuthorEl = root.querySelector('[data-testid="quote-author"]');
    this.favoriteBtnEl = root.querySelector('[data-testid="favorite-btn"]');
    this.newQuoteBtnEl = root.querySelector('[data-testid="new-quote-btn"]');
    this.statusAnnouncerEl = root.querySelector("#status-announcer");

    this.onNewQuoteCallback = null;
    this.onToggleFavoriteCallback = null;

    this.attachEventListeners();
  }

  attachEventListeners() {
    if (this.newQuoteBtnEl) {
      this.newQuoteBtnEl.addEventListener("click", () => {
        if (this.onNewQuoteCallback) {
          this.onNewQuoteCallback();
        }
      });
    }

    if (this.favoriteBtnEl) {
      this.favoriteBtnEl.addEventListener("click", () => {
        if (this.onToggleFavoriteCallback) {
          this.onToggleFavoriteCallback();
        }
      });
    }
  }

  bindNewQuote(callback) {
    this.onNewQuoteCallback = callback;
  }

  bindToggleFavorite(callback) {
    this.onToggleFavoriteCallback = callback;
  }

  renderQuote(quote, isFavorite) {
    if (this.quoteTextEl) {
      this.quoteTextEl.textContent = quote.text;
    }
    if (this.quoteAuthorEl) {
      this.quoteAuthorEl.textContent = `— ${quote.author}`;
    }
    this.updateFavoriteState(isFavorite);
  }

  updateFavoriteState(isFavorite) {
    if (!this.favoriteBtnEl) return;

    this.favoriteBtnEl.setAttribute("aria-pressed", isFavorite ? "true" : "false");
    this.favoriteBtnEl.setAttribute(
      "aria-label",
      isFavorite ? "Remove quote from favorites" : "Add quote to favorites"
    );

    const favoriteTextSpan = this.favoriteBtnEl.querySelector(".favorite-text");

    if (isFavorite) {
      this.favoriteBtnEl.classList.add("is-favorited");
      if (favoriteTextSpan) {
        favoriteTextSpan.textContent = "Favorited";
      }
    } else {
      this.favoriteBtnEl.classList.remove("is-favorited");
      if (favoriteTextSpan) {
        favoriteTextSpan.textContent = "Favorite";
      }
    }
  }

  announceStatus(message) {
    if (this.statusAnnouncerEl) {
      this.statusAnnouncerEl.textContent = message;
    }
  }
}
