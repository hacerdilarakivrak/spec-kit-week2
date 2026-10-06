# Tasks: Quote of the Day Page

**Feature**: Quote of the Day Page (`specs/001-quote-of-the-day`)  
**Branch**: `001-quote-of-the-day`  
**Date**: 2026-10-07  
**Status**: Completed  
**Plan**: [specs/001-quote-of-the-day/plan.md](./plan.md)  
**Spec**: [specs/001-quote-of-the-day/spec.md](./spec.md)  
**Assignment Constraint**: Strictly plain HTML, CSS, and JavaScript. NO TypeScript, NO Vite, NO frontend framework, NO backend.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, dev scripts, and static HTML/CSS layout

- [X] T001 Create project package.json with test script using Node.js native test runner in package.json
- [X] T002 [P] Create initial HTML skeleton with semantic layout, quote card, and star control in index.html
- [X] T003 [P] Create application stylesheet with responsive typography, star visual states, and focus rings in src/styles.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core JavaScript data models, built-in quotes, and resilient localStorage persistence layer

**⚠️ CRITICAL**: Must complete before user story implementation can begin

- [X] T004 [P] Implement Quote entity definition and validation ('id' non-empty string, 'text' string length >= 3, 'author' non-empty string) in src/models/quote.js
- [X] T005 [P] Implement curated built-in quote dataset with at least 10 unique quotes in src/data/quotes.js
- [X] T006 [P] Implement FavoriteState models and localStorage key contracts in src/models/favorite-state.js
- [X] T007 Implement resilient StorageService with try/catch localStorage wrapper and in-memory fallback in src/services/storage-service.js
- [X] T008 [P] Create unit tests for StorageService localStorage persistence and error fallback in tests/unit/storage-service.test.js

**Checkpoint**: Foundation complete. Core models and storage resilience verified.

---

## Phase 3: User Story 1 - View Random Quote on Page Load (Priority: P1) 🎯 MVP

**Goal**: Present a randomly chosen quote and author attribution immediately when the page loads.

**Independent Test**: Load the application in a fresh browser session; verify that non-empty quote text and author attribution render in `[data-testid="quote-text"]` and `[data-testid="quote-author"]`.

### Tests for User Story 1 (Test-First) 🧪

- [X] T009 [P] [US1] Create unit tests for QuoteService initial quote retrieval and random selection in tests/unit/quote-service.test.js
- [X] T010 [P] [US1] Create DOM integration test for initial page load and quote rendering in tests/integration/quote-view.test.js

### Implementation for User Story 1

- [X] T011 [US1] Implement QuoteService with getAllQuotes and getRandomQuote in src/services/quote-service.js
- [X] T012 [US1] Implement QuoteView initial rendering logic (card, text, author cite) in src/ui/quote-view.js
- [X] T013 [US1] Wire application bootstrap and initial quote display on DOM load in src/main.js

**Checkpoint**: User Story 1 functional and independently testable as an MVP increment.

---

## Phase 4: User Story 2 - Request a New Random Quote (Priority: P1)

**Goal**: Allow users to click "New quote" to display a different quote immediately without full page reload.

**Independent Test**: Click `[data-testid="new-quote-btn"]`; verify that the displayed quote updates to a different quote from the dataset without repeating the current quote consecutively.

### Tests for User Story 2 (Test-First) 🧪

- [X] T014 [P] [US2] Add unit tests for QuoteService non-repeating random selection with excludeId in tests/unit/quote-service.test.js
- [X] T015 [P] [US2] Add integration test for 'New quote' button click updating DOM in tests/integration/quote-view.test.js

### Implementation for User Story 2

- [X] T016 [US2] Update QuoteService.getRandomQuote(excludeId) to guarantee different selection when collection size > 1 in src/services/quote-service.js
- [X] T017 [US2] Implement 'New quote' button and click event binding in src/ui/quote-view.js
- [X] T018 [US2] Connect 'New quote' action to view controller and quote service in src/main.js

**Checkpoint**: User Stories 1 and 2 work seamlessly together.

---

## Phase 5: User Story 3 - Favorite and Unfavorite Quotes with Star Control & localStorage Persistence (Priority: P2)

**Goal**: Toggle favorite status on displayed quote via a star control, visually reflect active/inactive state, update accessible labels, and persist across page reloads via localStorage.

**Independent Test**: Click star control on active quote; verify `aria-pressed="true"`, `aria-label="Remove quote from favorites"`, active gold star visual state, and `localStorage` persistence; reload page, view quote, verify favorite state remains active; click again to unfavorite and verify removal.

### Tests for User Story 3 (Test-First) 🧪

- [X] T019 [P] [US3] Add unit tests for FavoriteService toggle, localStorage read/write, and error resilience in tests/unit/favorite-service.test.js
- [X] T020 [P] [US3] Add integration tests for star button toggle, dynamic aria-label, active visual classes, and reload restoration in tests/integration/quote-view.test.js

### Implementation for User Story 3

- [X] T021 [US3] Implement FavoriteService managing favorited quote IDs and localStorage sync in src/services/favorite-service.js
- [X] T022 [US3] Implement star control button with star icon, active gold highlight class, and dynamic aria-label/aria-pressed in src/ui/quote-view.js
- [X] T023 [US3] Synchronize star state, accessible labels, and live region announcements on quote change and load in src/main.js

**Checkpoint**: All three user stories fully implemented and verified.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, documentation, and end-to-end quality validation

- [X] T024 [P] Add keyboard accessibility, focus rings, and ARIA live announcements in src/ui/quote-view.js, index.html
- [X] T025 [P] Add execution instructions and development guide in README.md
- [X] T026 Execute full automated test suite (npm test) and verify zero failures in tests/
- [X] T027 Validate all manual scenarios against quickstart guide in specs/001-quote-of-the-day/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

```mermaid
flowchart TD
    P1[Phase 1: Setup] --> P2[Phase 2: Foundational]
    P2 --> P3[Phase 3: User Story 1 (P1 MVP)]
    P3 --> P4[Phase 4: User Story 2 (P1)]
    P4 --> P5[Phase 5: User Story 3 (P2)]
    P5 --> P6[Phase 6: Polish & Quality]
```

- **Setup (Phase 1)**: Independent; starts immediately.
- **Foundational (Phase 2)**: Depends on Setup; BLOCKS all user stories.
- **User Stories (Phases 3–5)**: Depend on Foundational completion.
  - Can be developed sequentially in priority order (P1 → P1 → P2).
- **Polish (Phase 6)**: Depends on all user stories completing.

### Within Each User Story

1. Write tests first and confirm failure (Red).
2. Implement model/service modules in plain JavaScript.
3. Implement UI view, accessible labels, and DOM bindings.
4. Verify tests pass (Green) and refactor.

### Parallel Opportunities

- **Phase 1**: T002 and T003 can run in parallel.
- **Phase 2**: T004, T005, T006, T008 can run in parallel.
- **Phase 3**: Tests T009 and T010 can run in parallel.
- **Phase 4**: Tests T014 and T015 can run in parallel.
- **Phase 5**: Tests T019 and T020 can run in parallel.
- **Phase 6**: T024 and T025 can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Phase 1 (Setup) and Phase 2 (Foundational).
2. Complete Phase 3 (User Story 1: initial random quote display in plain JS).
3. **STOP & VALIDATE**: Execute tests to prove MVP functionality.

### Incremental Delivery
1. Foundation verified.
2. Deliver US1 (MVP quote viewing).
3. Deliver US2 (interactive "New quote" switching).
4. Deliver US3 (accessible star control and persistent `localStorage` favorites).
5. Run polish and quickstart verification.
