import { BUILT_IN_QUOTES } from "./data/quotes.js";
import { QuoteService } from "./services/quote-service.js";
import { StorageService } from "./services/storage-service.js";
import { FavoriteService } from "./services/favorite-service.js";
import { QuoteView } from "./ui/quote-view.js";
import { Quote } from "./models/quote.js";

export function bootstrapApp(): {
  quoteService: QuoteService;
  storageService: StorageService;
  favoriteService: FavoriteService;
  view: QuoteView;
  getCurrentQuote: () => Quote | null;
  loadNewQuote: () => void;
  toggleFavorite: () => boolean | null;
} {
  const quoteService = new QuoteService(BUILT_IN_QUOTES);
  const storageService = new StorageService();
  const favoriteService = new FavoriteService(storageService);
  const view = new QuoteView(document);

  let currentQuote: Quote | null = null;

  function displayQuote(quote: Quote): void {
    currentQuote = quote;
    const isFav = favoriteService.isFavorite(quote.id);
    view.renderQuote(quote, isFav);
  }

  function loadNewQuote(): void {
    const nextQuote = quoteService.getRandomQuote(currentQuote?.id);
    displayQuote(nextQuote);
    view.announceStatus(`New quote loaded: "${nextQuote.text}" by ${nextQuote.author}`);
  }

  function toggleFavorite(): boolean | null {
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
    bootstrapApp();
  });
}
