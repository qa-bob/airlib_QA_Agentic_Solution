---
applyTo: "tests/**/*.ts,tests/**/*.spec.ts"
---

## Playwright Test File Rules

All test files in `tests/` must follow these rules:

- Use `import { test, expect } from '@playwright/test'` — no other test runners.
- Every test must be wrapped in a `test.describe()` block named after the feature.
- Use `test.beforeEach()` for page object instantiation and navigation — not `test.beforeAll()` unless state is truly read-only.
- Test titles must follow the pattern: `should <verb phrase> when <condition> @<tag>`.
- Import Page Object classes from `../../pages/` (or `../pages/` depending on depth) — never use raw `page.locator()` in test files.
- Never call `page.waitForTimeout()`. Use `expect(...).toBeVisible()` or Playwright's built-in waiting.
- Each test must be fully independent — no test should depend on another test's side effects.
- Use `test.skip('reason')` rather than commenting out tests.
- Do not use `test.only()` in committed code.
- Screenshots and video are handled by `playwright.config.ts` on failure — do not add manual captures.
