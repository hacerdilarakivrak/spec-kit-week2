# Phase 0: Research & Technology Decisions

**Feature**: Quote of the Day Page (`specs/001-quote-of-the-day`)  
**Date**: 2026-10-06  
**Status**: Completed  
**Directives**: Use plain HTML/CSS/JavaScript, no backend; persist favorites in localStorage.

---

## 1. Application Architecture & Tech Stack

### Decision
Use **plain HTML5, CSS3, and standard modern JavaScript (ES Modules)** with **no backend**. Dev/test tooling uses **Vitest** for automated verification without introducing any client runtime dependencies.

### Rationale
- **Simplicity & Zero Runtime Overhead (Principle III & User Directive)**: The user explicitly directed the use of plain HTML/CSS/JavaScript and no backend. Standard ES Modules run natively in all modern browsers without compilation or bundler lock-in.
- **Maintainability & Portability**: A static HTML/CSS/JS page can be hosted on any static web host, CDN, or opened directly from disk.
- **Contract Safety & Testability (Principles I & II)**: Modular JavaScript files (`src/data/quotes.js`, `src/services/storage-service.js`, `src/services/quote-service.js`, `src/ui/quote-view.js`, `src/main.js`) ensure clean separation of concerns, easily tested in Vitest.

### Alternatives Considered
- **Frontend Frameworks (React, Vue, Svelte)**: Rejected per user instruction and Principle III (unnecessary abstraction and bundle weight).
- **Backend Service (Node.js/Express, Python/FastAPI)**: Rejected per user instruction ("no backend"); all data and interactions are client-side.

---

## 2. Persistence via localStorage

### Decision
Persist favorite quote identifiers directly in browser **`localStorage`** via a resilient service wrapper with automatic in-memory fallback.

### Rationale
- **Direct User Requirement & Web Standard**: `localStorage` provides persistent key-value storage surviving browser restarts and page refreshes.
- **Resilience & Graceful Degradation (Principle V & FR-010)**: Browsers in private mode, sandboxed iframes, or with storage quotas exceeded can throw DOMExceptions on `localStorage.setItem` or `getItem`. The wrapper catches storage errors and maintains an in-memory Set fallback, preventing application crashes.

### Alternatives Considered
- **IndexedDB**: Asynchronous complexity is disproportionate for storing a lightweight array of quote string IDs.
- **Cookies**: Inefficient; sends cookie data over HTTP headers and has strict size restrictions.

---

## 3. Accessible Star Control & Visual State

### Decision
Implement the favorite toggle as a semantic `<button type="button">` featuring a star icon (`★`), explicit `aria-pressed` state, dynamic accessible labels, and visually distinct active/inactive CSS styles.

### Rationale
- **Accessibility & Screen Reader Compliance (FR-006, SC-005)**: Using `aria-pressed="true|false"` and dynamically updating the accessible label (e.g. `aria-label="Add quote to favorites"` vs. `aria-label="Remove quote from favorites"`) guarantees assistive technologies understand current state.
- **Distinct Visual Styling (FR-005)**: Gold highlighted fill, scaled transform, and distinct contrast differentiate the active state from the subtle outline inactive state.

### Alternatives Considered
- **Checkbox input (`<input type="checkbox">`)**: Can be styled as a star, but `<button aria-pressed>` provides cleaner button ergonomics and keyboard activation without form wrappers.
