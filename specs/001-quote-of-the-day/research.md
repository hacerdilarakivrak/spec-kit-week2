# Phase 0: Research & Technology Decisions

**Feature**: Quote of the Day Page (`specs/001-quote-of-the-day`)  
**Date**: 2026-10-07  
**Status**: Completed  
**Assignment Constraint**: Strictly plain HTML, CSS, and JavaScript. NO TypeScript, NO Vite, NO frontend framework, NO backend.

---

## 1. Application Architecture & Technology Choices

### Decision
Implement the entire application using **plain semantic HTML5, CSS3, and standard vanilla JavaScript (ES Modules, `.js`)**. Zero TypeScript, zero Vite, zero frontend frameworks (React/Vue/Angular), and zero backend services.

### Rationale
- **Strict Assignment Compliance**: Directly honors the strict requirement: only plain HTML, CSS, and JavaScript.
- **Zero Build Step / Native Browser Compatibility**: Modern browsers natively support ES Modules (`import`/`export`), standard DOM APIs, CSS variables, and native `localStorage`. The application runs directly in any browser without transpilation, bundling, or tooling lock-in.
- **Clean Architecture & Separation of Concerns (Constitution Principle I & III)**: Even without TypeScript or frameworks, modular JavaScript (`src/data/quotes.js`, `src/services/storage-service.js`, `src/services/quote-service.js`, `src/services/favorite-service.js`, `src/ui/quote-view.js`, `src/main.js`) provides clean separation between data, business logic, persistence, and UI presentation.

### Alternatives Considered
- **TypeScript & Vite**: Explicitly prohibited by assignment requirements; removed.
- **Frontend Frameworks (React, Vue, Svelte)**: Prohibited and unnecessary for a static single-page widget.
- **Backend Services (Node/Express, Python)**: Prohibited; application operates entirely client-side.

---

## 2. Persistence Strategy: Browser localStorage

### Decision
Store favorited quote identifiers in browser **`localStorage`** under the key `"quote_of_the_day_favorites"` as a JSON-serialized array of string IDs, wrapped in a resilient `StorageService` class with automatic in-memory fallback.

### Rationale
- **Persistence Across Reloads (FR-007, FR-008)**: Browser `localStorage` synchronously preserves key-value data across page reloads and browser sessions without requiring an external database or network calls.
- **Error Resilience (FR-010, Constitution Principle V)**: Accessing `localStorage` can fail if disabled (e.g. strict private browsing mode, disabled cookies, storage quota exceeded). Wrapping `localStorage` operations in `try/catch` with a fallback `Map`/`Set` ensures the application never crashes.

### Alternatives Considered
- **IndexedDB**: Asynchronous callback overhead is unwarranted for a simple set of string IDs.
- **SessionStorage**: Does not persist across browser restarts or new tabs.

---

## 3. Accessible Star Control & Visual Feedback

### Decision
Use a semantic `<button type="button" data-testid="favorite-btn">` containing a star glyph (`<span class="favorite-icon" data-testid="favorite-icon">★</span>`), dynamically updating `aria-pressed="true|false"`, `aria-label="Add quote to favorites"` / `aria-label="Remove quote from favorites"`, and active CSS styling (`.is-favorited`).

### Rationale
- **Visual Clarity (FR-005)**: Active state applies a distinct gold background, border, filled star color, and subtle scale transform. Inactive state displays a subtle outline and neutral color.
- **Accessibility (FR-006, SC-005)**: Screen readers receive dynamic announcements via `aria-label` and `aria-pressed`, plus live announcements through an `#status-announcer` region (`aria-live="polite"`).

---

## 4. Testing & Quality Assurance Strategy

### Decision
Use the **native Node.js test runner (`node:test` and `node:assert`)** or a plain JavaScript test harness executing standard `.js` test files with zero compiler or bundler dependencies.

### Rationale
- **Constitution Principle II (Test-First & Automated Verification)**: Testing remains mandatory. Using Node's native built-in `node:test` runner allows executing tests on pure JavaScript `.js` files without TypeScript, Vite, or external compilation tools.
- **Zero Runtime or Build Dependencies**: Tests run via `npm test` (`node --test tests/**/*.test.js`) natively supported in modern Node.js.
