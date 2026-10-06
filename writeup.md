# Week 2 Assignment Writeup: Spec-Driven Development (SDD)

## 1. Overview & Workflow Prompts

This project demonstrates a complete Spec-Driven Development (SDD) workflow using GitHub Spec Kit to build a responsive, client-side **Quote of the Day** application. The lifecycle proceeded through the standard stages using the following prompts:

- **Constitution Stage**:
  ```text
  /speckit-constitution Create principles focused on code quality, testing, and maintainability.
  ```
  *Established core architectural principles: clean architecture, non-negotiable test-first practices, YAGNI simplicity, self-describing interfaces, and defensive error resilience.*

- **Initial Specification Stage**:
  ```text
  /speckit-specify A quote-of-the-day page: one random quote from a built-in list, a "New quote" button, and favoriting that persists across reloads.
  ```
  *Created user stories, prioritized acceptance criteria (P1/P2), and defined functional boundaries.*

- **Specification Refinement Stage**:
  ```text
  /speckit-specify Refine the existing quote-of-the-day specification: the favorite control must use a star icon with a clear active/inactive visual state, include an accessible label indicating whether the current quote is favorited, and preserve that state across page reloads using localStorage. Keep all existing requirements unchanged.
  ```
  *Formalized visual active/inactive star states, dynamic accessible labels (`aria-label`, `aria-pressed`), and explicit `localStorage` persistence requirements.*

- **Implementation Plan Refinement Stage**:
  ```text
  /speckit-plan Refine the existing implementation plan to strictly follow the assignment requirement: use only plain HTML, CSS, and JavaScript with no TypeScript, Vite, frontend framework, or backend. Favorites must persist using localStorage. Preserve all existing functional, accessibility, testing, and maintainability requirements from the specification.
  ```
  *Corrected the architecture to strictly enforce plain HTML, CSS, and vanilla JavaScript (native ES Modules) with zero TypeScript, zero Vite, zero frontend frameworks, and zero backend.*

- **Task Breakdown Stage**:
  ```text
  /speckit-tasks
  ```
  *Regenerated a dependency-ordered, checklist-compliant task list (T001–T027) targeting only `.js`, `.css`, and `.html` files.*

- **Implementation Stage**:
  ```text
  /speckit-implement
  ```
  *Executed the tasks: implemented plain JavaScript modules, authored test-first suites using Node's native test runner, and eliminated all TypeScript and Vite artifacts.*

- **Convergence Assessment Stage**:
  ```text
  /speckit-converge
  ```
  *Audited the final plain HTML/CSS/JS codebase against the specification, plan, tasks, and constitution to verify complete alignment and zero unmet obligations.*

---

## 2. Refinements During Development

### Specification Refinement: Favorite Control & Accessibility
During early manual review, a gap in requirement precision was identified: while the initial specification called for favoriting that persisted across page reloads, it did not precisely define the control's visual presentation or screen reader behavior. To resolve this without ad-hoc code patching, the specification was refined to mandate a star icon with distinct active/inactive visual states, an accessible label communicating favorite status (`aria-label="Add quote to favorites"` / `aria-label="Remove quote from favorites"`), and persistence via `localStorage`.

### Plan Refinement: Strict Plain HTML/CSS/JavaScript Compliance
An earlier planning iteration had introduced TypeScript and Vite for tooling. To strictly adhere to the assignment requirement, `/speckit-plan` was re-invoked to mandate **only plain HTML, CSS, and JavaScript with no TypeScript, Vite, frontend framework, or backend**.

Following this plan refinement:
1. All TypeScript configuration (`tsconfig.json`), bundler configurations (`vite.config.ts`, `vitest.config.ts`), and `.ts` files were removed.
2. Architecture was restructured into clean native ES Modules (`.js`) running natively in modern web browsers without any build or transpilation step.
3. `/speckit-tasks` and `/speckit-implement` were rerun, successfully re-synchronizing the task list, codebase, and test suites with the revised plan.

---

## 3. Final Architecture & Verification

### Project Structure (Plain Web Standards)
```text
index.html                    # Semantic HTML skeleton
src/
├── styles.css                # Responsive layout, star visual states, focus rings
├── main.js                   # Application bootstrap and composition root
├── data/
│   └── quotes.js             # Curated built-in quotes dataset
├── models/
│   ├── quote.js              # Quote entity validation
│   └── favorite-state.js     # localStorage keys and constants
├── services/
│   ├── quote-service.js      # Non-repeating quote selection logic
│   ├── storage-service.js    # Resilient localStorage wrapper with in-memory fallback
│   └── favorite-service.js   # Favorites state management and storage sync
└── ui/
    └── quote-view.js         # DOM renderer, accessible star button, live announcements
tests/
├── unit/
│   ├── quote-service.test.js # Unit tests for quote randomization and exclusions
│   ├── storage-service.test.js # Unit tests for localStorage persistence and fallbacks
│   └── favorite-service.test.js # Unit tests for favorite toggling and storage sync
└── integration/
    ├── quote-view.test.js    # DOM tests for star states, accessible labels, button clicks
    └── app-bootstrap.test.js # Full E2E lifecycle test (load -> new quote -> favorite -> reload)
```

### Running Locally (No Build Step)
The application runs directly in any modern browser without compilers or bundlers:
```bash
python -m http.server 5173
```
Open `http://localhost:5173/`.

### Automated Testing
Tests are written in plain JavaScript and executed using Node's native built-in test runner (`node:test`, `node:assert`):
```bash
npm test
```
- **Automated Verification**: **21 automated tests passed across 5 test suites** (100% pass rate, 0 failures).
- **Execution Speed**: Full suite runs in under 800 ms with zero build or compilation overhead.

---

## 4. Convergence Outcome

Running `/speckit-converge` evaluated the final plain HTML/CSS/JS codebase against all artifacts, yielding:

> **"Converged — the implementation satisfies the spec, plan, and tasks."**

- **Requirements Coverage**: 10/10 Functional Requirements (`FR-001`–`FR-010`) and 8/8 Acceptance Scenarios satisfied.
- **Plan Directives**: 100% compliant with plain HTML/CSS/JS, zero frameworks, zero backend, and `localStorage` persistence.
- **Tasks**: All 27 tasks in `tasks.md` verified and completed (`[X]`).
- **Constitution**: Compliant with all code quality, testing, maintainability, and error resilience principles.

---

## 5. What I Learned

At first, Spec-Driven Development felt like unnecessary overhead for a small project because writing constitutions, specifications, and technical plans took significantly longer than just jumping straight into writing code. However, the process quickly paid off once development began because having explicit, unambiguous requirements made the AI's code generation remarkably predictable and eliminated guesswork. Most importantly, when requirements needed adjustments, refining the feature at the specification level and propagating it through the pipeline proved far cleaner and less error-prone than manually patching code and hoping nothing broke.
