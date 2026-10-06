# Quickstart Validation Guide: Quote of the Day Page

**Feature**: Quote of the Day Page (`specs/001-quote-of-the-day`)  
**Date**: 2026-10-06  
**Status**: Completed  
**Directives**: Plain HTML/CSS/JavaScript, no backend; persist favorites in localStorage.

---

## 1. Prerequisites

- Modern web browser (Chrome, Edge, Firefox, Safari)
- Node.js (for local development server and automated tests)

---

## 2. Setup & Execution

From the project root:

```bash
# 1. Install development dependencies (Vitest, Vite)
npm install

# 2. Run automated verification suite
npm test

# 3. Start local server
npm run dev
```

Application URL: `http://localhost:5173/`

---

## 3. Validation Scenarios

### Scenario 1: Initial Page Load & Inactive Star State
1. Open `http://localhost:5173/` in an incognito window.
2. **Verify**:
   - Quote text and author attribution render in `[data-testid="quote-text"]` and `[data-testid="quote-author"]`.
   - The favorite button displays a star icon (`★`).
   - The button has `aria-pressed="false"`.
   - The button has `aria-label="Add quote to favorites"`.
   - The star does not have active gold highlighting.

### Scenario 2: Toggling Favorite & Accessible Label
1. Click the favorite button on the active quote.
2. **Verify**:
   - The button transitions to active state with gold styling (`.is-favorited`).
   - The button updates to `aria-pressed="true"`.
   - The accessible label updates to `aria-label="Remove quote from favorites"`.
   - Text updates to "Favorited".

### Scenario 3: `localStorage` Persistence Across Reloads
1. Note the quote favorited in Scenario 2.
2. Check browser Developer Tools > Application > Local Storage > `http://localhost:5173`.
3. **Verify**:
   - Key `quote_of_the_day_favorites` contains a JSON array containing the quote's ID (e.g. `["q-01"]`).
4. Hard reload the page (`Ctrl+F5` or `Cmd+Shift+R`).
5. Click "New quote" until the previously favorited quote is displayed.
6. **Verify**:
   - When that quote renders, the favorite button immediately displays the active star state, `aria-pressed="true"`, and `aria-label="Remove quote from favorites"`.

### Scenario 4: Non-repeating "New quote" Button
1. Click "New quote" repeatedly 5 times.
2. **Verify**:
   - The displayed quote changes on every click without consecutively repeating the previous quote.
