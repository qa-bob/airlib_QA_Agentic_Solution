# AGENTS.md — Airlib QA Agentic Solution

> Primary instructions for all GitHub Copilot agents working in this repository.
> This file is automatically loaded by Copilot CLI as the top-level agent context.

---

## Project Overview

This is a Playwright + TypeScript QA automation framework for [Airlib](https://www.airlib.co/),
a high-resolution urban air quality mapping platform. All test automation targets
the public-facing web app at `https://www.airlib.co/`.

---

## Repository Conventions

### Language & Framework
- **TypeScript** — strict mode enabled; no `any` types; all functions must have explicit return types.
- **Playwright** — use the `@playwright/test` runner exclusively. No other test runners.
- **Page Object Model** — all selectors and UI interactions live in `pages/`. Test files must not
  contain raw locators or `page.locator()` calls — route everything through POM classes.

### File Organization
```
tests/smoke/         → Critical path tests (login, map load, core navigation)
tests/functional/    → Feature-level tests
tests/regression/    → Full regression suite
pages/               → Page Object Model classes (one file per page/component)
fixtures/            → Shared test data, auth state, API fixtures
utils/               → Helpers (date formatters, URL builders, assertion wrappers)
```

### Naming Conventions
- Test files: `feature-name.spec.ts`
- Page Object files: `FeaturePage.ts` (PascalCase)
- Test cases: `test('should <verb> when <condition>', ...)`
- Locators in POMs: descriptive, role-based selectors preferred over CSS/XPath

---

## What Agents Must Always Do

1. **Read the existing Page Objects** in `pages/` before writing any test — reuse existing
   abstractions rather than creating duplicate selectors.

2. **Run the type checker** (`npm run typecheck`) after making TypeScript changes to catch
   errors before committing.

3. **Add `@smoke`, `@functional`, `@regression`, or `@accessibility` tags** to every new test
   using Playwright's `test.info().annotations` or test title convention.

4. **Write descriptive failure messages** in `expect()` assertions:
   ```typescript
   await expect(mapContainer, 'Map container should be visible on load').toBeVisible();
   ```

5. **Never use `page.waitForTimeout()`** — use Playwright's built-in auto-waiting and
   `expect(...).toBeVisible()` / `expect(...).toHaveText()` patterns instead.

6. **Accessibility tests** — when creating tests for a new page area, include at least one
   test using `@axe-core/playwright` to check for WCAG 2.1 AA violations.

---

## Custom Agents Available in This Repo

| Agent | File | Use Case |
|-------|------|----------|
| `qa-specialist` | `.github/agents/qa-specialist.agent.md` | Test strategy, coverage analysis, bug triage |
| `playwright-expert` | `.github/agents/playwright-expert.agent.md` | Test writing, debugging flaky tests, Playwright API usage |

### How to Invoke

```
# In Copilot CLI interactive session:
/agent
# Select from the list, or:
Use the qa-specialist agent to analyze test coverage for the map page
```

---

## Skills Available in This Repo

| Skill | Directory | Trigger |
|-------|-----------|---------|
| `playwright-e2e` | `.github/skills/playwright-e2e/` | Writing E2E tests from scratch |
| `accessibility-audit` | `.github/skills/accessibility-audit/` | Running WCAG audits |
| `page-object-generator` | `.github/skills/page-object-generator/` | Creating new POM classes |

### How to Invoke

```
# Copilot will auto-select the skill based on context, or specify explicitly:
Use the /page-object-generator skill to create a POM for the map filter sidebar
```

See [`Skills.md`](./Skills.md) for full skill documentation.

---

## Custom Instructions Reference

| File | Scope |
|------|-------|
| `.github/copilot-instructions.md` | All files — repo-wide rules |
| `.github/instructions/playwright-tests.instructions.md` | `tests/**/*.ts` |
| `.github/instructions/typescript.instructions.md` | `**/*.ts` |

---

## Target Application Context

- **URL**: `https://www.airlib.co/`
- **Key pages**: Home/map view, air quality data overlays, location search, data export
- **Auth**: Not yet implemented (add to this section when auth flows are scoped)
- **Browsers**: Chromium (primary), Firefox and WebKit (regression suite)
- **Viewports**: Desktop 1280×720 (primary), Mobile 375×812 (secondary)
