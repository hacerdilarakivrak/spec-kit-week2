# Quote of the Day

A clean, responsive client-side web application displaying daily wisdom and quotes from a curated built-in collection, featuring instant non-repeating quote discovery and persistent favoriting.

## Features

- **Random Quote on Load**: Displays an inspiring quote with author attribution upon initial visit.
- **"New quote" Button**: Instantly selects another quote from the built-in collection without repeating the active quote.
- **Persistent Favoriting**: Toggle favorites with a single click; favorite status persists across browser reloads and sessions via resilient local storage.
- **Graceful Storage Degradation**: Unobtrusively falls back to in-memory storage if browser storage is blocked or throws quota exceptions.
- **Accessible & Responsive**: Fully responsive across mobile and desktop with accessible ARIA semantics (`aria-pressed`, `aria-live`).

## Technology Stack

- **Language**: TypeScript 5.8+ (Strict mode)
- **Bundler & Dev Server**: Vite 6.x
- **Testing**: Vitest 3.x + `happy-dom`
- **Styling**: Modern vanilla CSS with responsive layout and focus management

## Getting Started

### Prerequisites

- Node.js 18+ (tested with v22.17.1)
- npm 9+ (tested with v10.9.2)

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

The production output will be generated in the `dist/` directory.

## Architecture

- `src/models/`: Domain entities (`Quote`) and type definitions (`FavoriteState`).
- `src/data/`: Curated built-in quote dataset.
- `src/services/`: Pure business logic (`QuoteService`) and storage abstraction (`StorageService`, `FavoriteService`).
- `src/ui/`: Presentation layer (`QuoteView`) and styles (`styles.css`).
- `tests/`: Vitest test suites covering unit logic and DOM integration.
