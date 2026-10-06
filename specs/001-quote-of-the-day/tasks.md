# Tasks: Quote of the Day Page

**Feature**: Quote of the Day Page (`specs/001-quote-of-the-day`)  
**Branch**: `001-quote-of-the-day`  
**Date**: 2026-10-06  
**Status**: Completed  
**Plan**: [specs/001-quote-of-the-day/plan.md](./plan.md)  
**Spec**: [specs/001-quote-of-the-day/spec.md](./spec.md)  
**Directives**: Plain HTML/CSS/JavaScript, no backend; persist favorites in localStorage.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, dev tooling, and static asset layout

- [X] T001 Create project configuration with package.json, TypeScript config, and Vite in package.json, tsconfig.json, vite.config.ts
- [X] T002 [P] Configure Vitest testing environment and happy-dom harness in vitest.config.ts
- [X] T003 [P] Create initial HTML skeleton with semantic layout, quote card, and star control button in index.html
- [X] T004 [P] Create application stylesheet with responsive typography, star visual states, and focus rings in src/ui/styles.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure, data types, and resilient localStorage persistence layer

**⚠️ CRITICAL**: Must complete before user story implementation can begin

- [X] T005 [P] Implement Quote entity definition and validation ('id' non-empty string, 'text' string length >= 3, 'author' non-empty string) in src/models/quote.ts
- [X] T006 [P] Implement curated built-in quote dataset with at least 10 unique quotes in src/data/quotes.ts
- [X] T007 [P] Implement FavoriteState models and localStorage key contracts in src/models/favorite-state.ts
- [X] T008 Implement resilient StorageService with try/catch localStorage wrapper and in-memory fallback in src/services/storage-service.ts
- [X] T009 [P] Create unit tests for StorageService localStorage persistence and error fallback in tests/unit/storage-service.test.ts

**Checkpoint**: Foundation complete. Core models and storage resilience verified.

---

## Phase 3: User Story 1 - View Random Quote on Page Load (Priority: P1) 🎯 MVP

**Goal**: Present a randomly chosen quote and author attribution immediately when the page loads.

**Independent Test**: Load the application in a fresh browser session; verify that non-empty quote text and author attribution render in `[data-testid="quote-text"]` and `[data-testid="quote-author"]`.

### Tests for User Story 1 (Test-First) 🧪

- [X] T010 [P] [US1] Create unit tests for QuoteService initial quote retrieval and random selection in tests/unit/quote-service.test.ts
- [X] T011 [P] [US1] Create DOM integration test for initial page load and quote rendering in tests/integration/quote-view.test.ts

### Implementation for User Story 1

- [X] T012 [US1] Implement QuoteService with getAllQuotes and getRandomQuote in src/services/quote-service.ts
- [X] T013 [US1] Implement QuoteView initial rendering logic (card, text, author cite) in src/ui/quote-view.ts
- [X] T014 [US1] Wire application bootstrap and initial quote display on DOM load in src/main.ts

**Checkpoint**: User Story 1 functional and independently testable as an MVP increment.

---

## Phase 4: User Story 2 - Request a New Random Quote (Priority: P1)

**Goal**: Allow users to click "New quote" to display a different quote immediately without full page reload.

**Independent Test**: Click `[data-testid="new-quote-btn"]`; verify that the displayed quote updates to a different quote from the dataset without repeating the current quote consecutively.

### Tests for User Story 2 (Test-First) 🧪

- [X] T015 [P] [US2] Add unit tests for QuoteService non-repeating random selection with excludeId in tests/unit/quote-service.test.ts
- [X] T016 [P] [US2] Add integration test for 'New quote' button click updating DOM in tests/integration/quote-view.test.ts

### Implementation for User Story 2

- [X] T017 [US2] Update QuoteService.getRandomQuote(excludeId) to guarantee different selection when collection size > 1 in src/services/quote-service.ts
- [X] T018 [US2] Implement 'New quote' button and click event binding in src/ui/quote-view.ts
- [X] T019 [US2] Connect 'New quote' action to view controller and quote service in src/main.ts

**Checkpoint**: User Stories 1 and 2 work seamlessly together.

---

## Phase 5: User Story 3 - Favorite and Unfavorite Quotes with Star Control & localStorage Persistence (Priority: P2)

**Goal**: Toggle favorite status on displayed quote via a star control, visually reflect active/inactive state, update accessible labels, and persist across page reloads via localStorage.

**Independent Test**: Click star control on active quote; verify `aria-pressed="true"`, `aria-label="Remove quote from favorites"`, active gold star visual state, and `localStorage` persistence; reload page, view quote, verify favorite state remains active; click again to unfavorite and verify removal.

### Tests for User Story 3 (Test-First) 🧪

- [X] T020 [P] [US3] Add unit tests for FavoriteService toggle, localStorage read/write, and error resilience in tests/unit/favorite-service.test.ts
- [X] T021 [P] [US3] Add integration tests for star button toggle, dynamic aria-label, active visual classes, and reload restoration in tests/integration/quote-view.test.ts

### Implementation for User Story 3

- [X] T022 [US3] Implement FavoriteService managing favorited quote IDs and localStorage sync in src/services/favorite-service.ts
- [X] T023 [US3] Implement star control button with star icon, active gold highlight class, and dynamic aria-label/aria-pressed in src/ui/quote-view.ts
- [X] T024 [US3] Synchronize star state, accessible labels, and live region announcements on quote change and load in src/main.ts

**Checkpoint**: All three user stories fully implemented and verified.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, documentation, and end-to-end quality validation

- [X] T025 [P] Add keyboard accessibility, focus rings, and ARIA live announcements in src/ui/quote-view.ts, index.html
- [X] T026 [P] Add execution instructions and development guide in README.md
- [X] T027 Execute full automated test suite (npm test) and verify zero failures in tests/
- [X] T028 Validate all manual scenarios against quickstart guide in specs/001-quote-of-the-day/quickstart.md

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
2. Implement model/service contracts.
3. Implement UI view, accessible labels, and bindings.
4. Verify tests pass (Green) and refactor.

### Parallel Opportunities

- **Phase 1**: T002, T003, T004 can run in parallel.
- **Phase 2**: T005, T006, T007, T009 can run in parallel.
- **Phase 3**: Tests T010 and T011 can run in parallel.
- **Phase 4**: Tests T015 and T016 can run in parallel.
- **Phase 5**: Tests T020 and T021 can run in parallel.
- **Phase 6**: T025 and T026 can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Phase 1 (Setup) and Phase 2 (Foundational).
2. Complete Phase 3 (User Story 1: initial random quote display).
3. **STOP & VALIDATE**: Execute tests to prove MVP functionality.

### Incremental Delivery
1. Foundation verified.
2. Deliver US1 (MVP quote viewing).
3. Deliver US2 (interactive "New quote" switching).
4. Deliver US3 (accessible star control and persistent `localStorage` favorites).
5. Run polish and quickstart verification.
