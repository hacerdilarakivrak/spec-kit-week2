import { BUILT_IN_QUOTES } from "./data/quotes.js";
import { QuoteService } from "./services/quote-service.js";
import { StorageService } from "./services/storage-service.js";
import { FavoriteService } from "./services/favorite-service.js";
import { QuoteView } from "./ui/quote-view.js";

/**
 * Bootstrap function initializes components and event bindings.
 * @param {Document|HTMLElement} [root=document]
 */
export function bootstrapApp(root = typeof document !== "undefined" ? document : null) {
  if (!root) return null;

  const quoteService = new QuoteService(BUILT_IN_QUOTES);
  const storageService = new StorageService();
  const favoriteService = new FavoriteService(storageService);
  const view = new QuoteView(root);

  let currentQuote = null;

  function displayQuote(quote) {
    currentQuote = quote;
    const isFav = favoriteService.isFavorite(quote.id);
    view.renderQuote(quote, isFav);
  }

  function loadNewQuote() {
    const nextQuote = quoteService.getRandomQuote(currentQuote?.id);
    displayQuote(nextQuote);
    view.announceStatus(`New quote loaded: "${nextQuote.text}" by ${nextQuote.author}`);
  }

  function toggleFavorite() {
    if (!currentQuote) return null;

    const isNowFav = favoriteService.toggleFavorite(currentQuote.id);
    view.updateFavoriteState(isNowFav);

    const announcement = isNowFav
      ? `Added quote by ${currentQuote.author} to favorites.`
      : `Removed quote by ${currentQuote.author} from favorites.`;
    view.announceStatus(announcement);

    return isNowFav;
  }

  // Bind UI interactions
  view.bindNewQuote(() => {
    loadNewQuote();
  });

  view.bindToggleFavorite(() => {
    toggleFavorite();
  });

  // Initial load
  loadNewQuote();

  return {
    quoteService,
    storageService,
    favoriteService,
    view,
    getCurrentQuote: () => currentQuote,
    loadNewQuote,
    toggleFavorite,
  };
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    bootstrapApp(document);
  });
}
