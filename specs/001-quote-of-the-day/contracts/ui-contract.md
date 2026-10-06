# UI Interface Contract

**Feature**: Quote of the Day Page (`specs/001-quote-of-the-day`)  
**Date**: 2026-10-06  
**Status**: Completed  
**Directives**: Plain HTML/CSS/JavaScript, no backend; localStorage persistence.

---

## 1. DOM Elements & Semantic Selectors

| Element / Role | Selector / `data-testid` | Attributes & Accessibility | Purpose |
|:---|:---|:---|:---|
| **Quote Card Container** | `[data-testid="quote-card"]` | `role="region"`, `aria-label="Quote of the Day"` | Primary presentation card |
| **Quote Text** | `[data-testid="quote-text"]` | `<blockquote data-testid="quote-text">` | Displays the quote text |
| **Quote Author** | `[data-testid="quote-author"]` | `<cite data-testid="quote-author">` | Displays author attribution |
| **"New quote" Button** | `[data-testid="new-quote-btn"]` | `<button type="button" aria-label="Load a new quote">` | Trigger to select next random quote |
| **Favorite Control Button** | `[data-testid="favorite-btn"]` | `<button type="button" aria-pressed="true\|false" aria-label="...">` | Toggles favorite state with star icon |
| **Star Icon** | `[data-testid="favorite-icon"]` | `<span class="favorite-icon" data-testid="favorite-icon" aria-hidden="true">★</span>` | Visual star indicator |
| **Status Announcer** | `#status-announcer` | `<div id="status-announcer" class="sr-only" aria-live="polite">` | Live region for screen reader updates |

---

## 2. Star Control States & Transitions

### Inactive State (Quote Not Favorited):
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

### Active State (Quote Favorited):
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

- On quote render: Query `localStorage` for active quote ID.
- If favorited: apply active attributes (`aria-pressed="true"`, `aria-label="Remove quote from favorites"`, class `is-favorited`).
- If unfavorited: apply inactive attributes (`aria-pressed="false"`, `aria-label="Add quote to favorites"`, remove class `is-favorited`).
- On click: toggle state, update `localStorage`, update attributes and classes immediately.
