---
name: playwright-e2e
description: End-to-end Playwright test generation workflow for the Airlib QA framework. Use this skill when asked to write new E2E tests, create test suites for a feature, or scaffold test files from a user story or acceptance criteria.
---

## E2E Test Generation Workflow

When asked to write end-to-end tests, follow these steps:

### Step 1 — Understand the Feature

Read the feature description or user story. If not provided, ask for:
- The URL or page to test
- The user actions to cover
- Expected outcomes (happy path and error cases)
- Any existing acceptance criteria

### Step 2 — Check Existing Resources

Before writing anything:
1. List files in `pages/` to find existing Page Object Models for the target page.
2. List files in `fixtures/` to find reusable test data or auth state.
3. Read `AGENTS.md` for project conventions.

### Step 3 — Create or Update the Page Object

If no POM exists for the target page, create one in `pages/` following this pattern:

```typescript
import { Page, Locator, expect } from '@playwright/test';

export class [PageName]Page {
  readonly page: Page;
  // Locators — use role-based selectors
  readonly [elementName]: Locator;

  constructor(page: Page) {
    this.page = page;
    this.[elementName] = page.getByRole('[role]', { name: '[accessible name]' });
  }

  async navigate(): Promise<void> {
    await this.page.goto('[relative-or-absolute-url]');
  }

  // Action methods — what users do
  async [actionName]([params]): Promise<void> {
    await this.[elementName].[action]();
  }

  // Assertion methods — what you verify
  async assert[StateName](description = '[default description]'): Promise<void> {
    await expect(this.[elementName], description).toBeVisible();
  }
}
```

### Step 4 — Write the Spec File

Create the spec file in the appropriate directory:
- `tests/smoke/` for critical path tests (< 60 seconds total)
- `tests/functional/` for feature tests
- `tests/regression/` for full regression coverage

Use this structure:

```typescript
import { test, expect } from '@playwright/test';
import { [PageName]Page } from '../../pages/[PageName]Page';

test.describe('[Feature Name]', () => {
  let [pageName]Page: [PageName]Page;

  test.beforeEach(async ({ page }) => {
    [pageName]Page = new [PageName]Page(page);
    await [pageName]Page.navigate();
  });

  test('should [expected behavior] when [condition] @[tag]', async () => {
    // Arrange — set up state if needed
    // Act — perform user action
    await [pageName]Page.[action]();
    // Assert — verify outcome with descriptive message
    await [pageName]Page.assert[State]('[What we expect and why]');
  });
});
```

### Step 5 — Tag Every Test

Add at least one tag to every test:
- `@smoke` — include in critical path
- `@functional` — feature verification
- `@regression` — nightly suite
- `@accessibility` — WCAG checks

### Step 6 — Verify

After writing the test:
1. Run `npm run typecheck` to verify TypeScript types.
2. Run the specific spec: `npx playwright test [path/to/spec.ts] --headed`
3. Fix any failures before considering the task complete.
