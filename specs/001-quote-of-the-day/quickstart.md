# Quickstart Validation Guide: Quote of the Day Page

**Feature**: Quote of the Day Page (`specs/001-quote-of-the-day`)  
**Date**: 2026-10-07  
**Status**: Completed  
**Assignment Constraint**: Strictly plain HTML, CSS, and JavaScript with NO TypeScript, Vite, frontend framework, or backend.

---

## 1. Prerequisites

- Any modern web browser (Chrome, Edge, Firefox, Safari)
- Node.js (for running the automated test runner)

---

## 2. Running Locally (No Build Step Required)

Because this application uses standard vanilla HTML, CSS, and native JavaScript ES Modules, **no build step, transpiler, or bundler is needed**:

```bash
# Option A: Start a local static file server using Python
python -m http.server 5173

# Option B: Start a local static file server using Node/npx
npx serve -l 5173 .
```

Open your browser at: `http://localhost:5173/`

---

## 3. Running Automated Tests

Run the pure JavaScript automated test suite:

```bash
npm test
```

---

## 4. End-to-End Validation Scenarios

### Scenario 1: Initial Page Load & Inactive Star State
1. Open `http://localhost:5173/` in a fresh browser window.
2. **Verify**:
   - A quote and author attribution are immediately visible in `[data-testid="quote-text"]` and `[data-testid="quote-author"]`.
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
   - The button text updates to "Favorited".

### Scenario 3: `localStorage` Persistence Across Reloads
1. Note the quote favorited in Scenario 2.
2. Check browser Developer Tools > Application > Local Storage > `http://localhost:5173`.
3. **Verify**:
   - Key `quote_of_the_day_favorites` contains a JSON array containing the quote's ID (e.g. `["q-01"]`).
4. Hard reload the page (`F5` or `Ctrl+R`).
5. Click "New quote" until the previously favorited quote is displayed.
6. **Verify**:
   - When that quote renders, the favorite button displays the active star state, `aria-pressed="true"`, and `aria-label="Remove quote from favorites"`.

### Scenario 4: Non-repeating "New quote" Button
1. Click "New quote" 5 consecutive times.
2. **Verify**:
   - The quote changes on every click without consecutively repeating the previous quote.
