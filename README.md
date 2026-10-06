# Quote of the Day

A clean, responsive, single-page web application displaying daily wisdom from a curated built-in collection, featuring instant non-repeating quote discovery and persistent favoriting.

Built strictly with **plain HTML5, CSS3, and standard vanilla JavaScript (ES Modules)** — zero TypeScript, zero Vite, zero frontend frameworks, and zero backend services.

## Features

- **Random Quote on Load**: Displays an inspiring quote with author attribution upon initial visit.
- **"New quote" Button**: Instantly selects another quote from the built-in collection without repeating the active quote.
- **Persistent Favoriting**: Accessible star control (`★`) with clear active/inactive visual states (`.is-favorited`), dynamic `aria-label` and `aria-pressed` states, persisting across browser reloads via `localStorage`.
- **Graceful Storage Degradation**: Unobtrusively falls back to an in-memory store if browser storage is blocked or throws quota exceptions.
- **Accessible & Responsive**: Fully responsive across mobile and desktop devices with accessible ARIA semantics and live region announcements (`#status-announcer`).

## Technology Stack

- **HTML**: Semantic HTML5 (`<blockquote>`, `<cite>`, `<button>`, `<main>`)
- **CSS**: Modern responsive CSS3 with CSS custom properties, flexbox, and accessible focus outlines
- **JavaScript**: Standard vanilla ECMAScript Modules (`.js`) running natively in modern browsers
- **Storage**: Browser native `localStorage`
- **Testing**: Node.js native test runner (`node:test`, `node:assert`)

## Running Locally

Because this application uses standard browser-native Web technologies with native ES Modules, **no build step or compiler is required**:

```bash
# Option 1: Start a local HTTP server with Python
python -m http.server 5173

# Option 2: Start a local HTTP server with Node.js
npx serve -l 5173 .
```

Open `http://localhost:5173/` in any modern web browser.

## Running Tests

Run the pure JavaScript automated test suite using Node's native test runner:

```bash
npm test
```

## Project Architecture

```text
index.html                    # Semantic HTML skeleton
src/
├── styles.css                # Pure CSS layout, theme, and star states
├── main.js                   # Application bootstrap and composition root
├── data/
│   └── quotes.js             # Curated built-in quotes dataset
├── models/
│   ├── quote.js              # Quote validation logic
│   └── favorite-state.js     # Storage keys and constants
├── services/
│   ├── quote-service.js      # Quote selection and non-repeating randomization
│   ├── storage-service.js    # Resilient localStorage wrapper with in-memory fallback
│   └── favorite-service.js   # Favorite state management and localStorage sync
└── ui/
    └── quote-view.js         # DOM renderer, accessible star button, ARIA announcements
tests/
├── unit/
│   ├── quote-service.test.js # Unit tests for quote randomization and exclusions
│   ├── storage-service.test.js # Unit tests for localStorage persistence and fallbacks
│   └── favorite-service.test.js # Unit tests for favorite toggling and storage sync
└── integration/
    ├── quote-view.test.js    # DOM tests for star state, accessible labels, button clicks
    └── app-bootstrap.test.js # E2E lifecycle test (load -> new quote -> favorite -> reload)
```
