# Copilot Instructions — Airlib QA Agentic Solution

These instructions apply to all GitHub Copilot requests made in this repository.
They are automatically loaded by Copilot CLI and Copilot in the IDE.

---

## Project Identity

This is a **Playwright + TypeScript QA automation framework** targeting
https://www.airlib.co/ — an urban air quality mapping platform.

---

## Code Style & Quality Rules

- Use **TypeScript strict mode**. Never use `any`. Always add return types to functions.
- Use **async/await** exclusively — no `.then()` chaining in test code.
- Keep test files focused: one feature or page per spec file.
- Every `test()` block must be independent and idempotent — no shared mutable state between tests.
- Use `test.describe()` blocks to group related tests within a spec file.
- Prefer **role-based selectors** (`getByRole`, `getByLabel`, `getByText`) over CSS or XPath.

## Page Object Model

- All selector logic lives in `pages/` — never write `page.locator()` directly in test files.
- Each Page Object class must extend a `BasePage` class that handles navigation.
- Expose **actions** (methods that perform user interactions) and **assertions** (methods
  that wrap `expect` calls) from each POM class.
- POM class names must match the page they represent: `HomePage`, `MapPage`, `SearchPage`.

## Assertions

- Always use Playwright's `expect` from `@playwright/test` — never use Jest or Chai.
- Write soft assertions using `expect.soft()` only when multiple checks on the same page
  should all run regardless of individual failures.
- Include a descriptive second argument: `expect(el, 'description').toBeVisible()`.

## Test Tagging

Tag every test case using annotations in the test title or `test.info().annotations`:
- `@smoke` — critical path, runs on every deployment
- `@functional` — feature-level verification
- `@regression` — full suite, runs nightly
- `@accessibility` — WCAG checks using axe-core

## Error Handling

- Do not catch errors in test files to silence failures — let them propagate.
- Use `test.skip()` with a clear reason when a test is temporarily disabled.
- Never use `test.only()` in committed code.

## Imports & Dependencies

- Import Playwright utilities from `@playwright/test` only — not from `playwright` directly.
- All shared utilities must live in `utils/` and be re-exported from `utils/index.ts`.
- Test fixtures must live in `fixtures/` and be wired through Playwright's `test.extend()`.

## File Naming

- Spec files: `kebab-case.spec.ts`
- POM files: `PascalCasePage.ts`
- Utility files: `camelCase.ts`
- Fixture files: `kebab-case.fixture.ts`

## GitHub Actions & CI

- All tests must pass in the `playwright-ci` workflow before merge.
- Do not hard-code browser names — reference them from `playwright.config.ts` projects.
- Screenshots and traces are captured on failure automatically — do not add manual captures
  in test code unless debugging a specific issue.
