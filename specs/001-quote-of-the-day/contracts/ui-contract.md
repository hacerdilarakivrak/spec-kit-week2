# UI Interface Contract

**Feature**: Quote of the Day Page (`specs/001-quote-of-the-day`)  
**Date**: 2026-10-07  
**Status**: Completed  
**Assignment Constraint**: Plain HTML/CSS/JavaScript, no TypeScript, no Vite, no framework, no backend.

---

## 1. DOM Elements & Semantic Selectors

| Element / Role | Selector / `data-testid` | Attributes & Accessibility | Purpose |
|:---|:---|:---|:---|
| **Quote Card Container** | `[data-testid="quote-card"]` | `role="region"`, `aria-label="Quote of the Day"` | Primary presentation card container |
| **Quote Text** | `[data-testid="quote-text"]` | `<blockquote data-testid="quote-text">` | Displays the quote text |
| **Quote Author** | `[data-testid="quote-author"]` | `<cite data-testid="quote-author">` | Displays author attribution |
| **"New quote" Button** | `[data-testid="new-quote-btn"]` | `<button type="button" aria-label="Load a new quote">` | Trigger to select next random quote |
| **Favorite Control Button** | `[data-testid="favorite-btn"]` | `<button type="button" aria-pressed="true\|false" aria-label="...">` | Toggles favorite state with star icon |
| **Star Icon** | `[data-testid="favorite-icon"]` | `<span class="favorite-icon" data-testid="favorite-icon" aria-hidden="true">★</span>` | Visual star indicator |
| **Status Announcer** | `#status-announcer` | `<div id="status-announcer" class="sr-only" aria-live="polite">` | Live region for screen reader updates |

---

## 2. Star Control Markup & Visual States

### Inactive State (Unfavorited):
```html
<button
  type="button"
  class="btn btn-favorite"
  data-testid="favorite-btn"
  aria-pressed="false"
  aria-label="Add quote to favorites"
>
  <span class="favorite-icon" data-testid="favorite-icon" aria-hidden="true">★</span>
  <span class="favorite-text">Favorite</span>
</button>
```

### Active State (Favorited):
```html
<button
  type="button"
  class="btn btn-favorite is-favorited"
  data-testid="favorite-btn"
  aria-pressed="true"
  aria-label="Remove quote from favorites"
>
  <span class="favorite-icon" data-testid="favorite-icon" aria-hidden="true">★</span>
  <span class="favorite-text">Favorited</span>
</button>
```

---

## 3. Storage Interaction Contract

- **On initial load / quote change**:
  - Check `localStorage` for current quote ID.
  - If favorited: apply `aria-pressed="true"`, `aria-label="Remove quote from favorites"`, `.is-favorited` class, and text "Favorited".
  - If unfavorited: apply `aria-pressed="false"`, `aria-label="Add quote to favorites"`, remove `.is-favorited` class, and text "Favorite".
- **On button click**:
  - Toggle state in memory and update `localStorage` under `"quote_of_the_day_favorites"`.
  - Update DOM attributes and announce change via `#status-announcer`.
