---
name: page-object-generator
description: Generates a typed TypeScript Page Object Model class for a given URL or application page. Use this skill when asked to create, scaffold, or generate a Page Object or POM class for any page in the Airlib application.
---

## Page Object Model Generation Workflow

### Step 1 — Navigate and Inspect

1. Read the existing `pages/` directory to understand naming and structure conventions.
2. If a URL is provided, note the page type (landing, search results, detail, modal, etc.).
3. Identify the key interactive elements:
   - Navigation elements
   - Forms and inputs
   - Buttons and CTAs
   - Data display areas
   - Error/success messages

### Step 2 — Define Locators

Use this selector preference order (highest to lowest priority):
1. `page.getByRole()` — semantic and accessible
2. `page.getByLabel()` — form inputs
3. `page.getByText()` — unique text content
4. `page.getByTestId()` — when `data-testid` attributes exist
5. `page.locator('[data-*]')` — custom data attributes
6. CSS selectors — only as a last resort, and only stable ones

**Never use**: XPath, nth-child selectors without context, or class names that look auto-generated.

### Step 3 — Generate the POM Class

```typescript
import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for [Page Name]
 * URL: [full or relative URL]
 */
export class [PageName]Page {
  readonly page: Page;

  // --- Locators ---
  // Navigation
  readonly [navElement]: Locator;

  // Primary content
  readonly [primaryElement]: Locator;

  // Forms & inputs
  readonly [inputElement]: Locator;
  readonly [submitButton]: Locator;

  // Feedback
  readonly [successMessage]: Locator;
  readonly [errorMessage]: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.[navElement] = page.getByRole('[role]', { name: '[accessible name]' });

    // Primary content
    this.[primaryElement] = page.getByRole('[role]', { name: '[accessible name]' });

    // Forms & inputs
    this.[inputElement] = page.getByLabel('[label text]');
    this.[submitButton] = page.getByRole('button', { name: '[button text]' });

    // Feedback
    this.[successMessage] = page.getByRole('alert').filter({ hasText: '[success text]' });
    this.[errorMessage] = page.getByRole('alert').filter({ hasText: '[error text]' });
  }

  // --- Navigation ---

  async navigate(): Promise<void> {
    await this.page.goto('[relative-or-absolute-url]');
  }

  // --- Actions ---

  async [performAction]([param]: string): Promise<void> {
    await this.[inputElement].fill([param]);
    await this.[submitButton].click();
  }

  // --- Assertions ---

  async assertPageLoaded(description = '[Page Name] should be fully loaded'): Promise<void> {
    await expect(this.[primaryElement], description).toBeVisible();
  }

  async assertSuccessState(description = 'Success state should be visible'): Promise<void> {
    await expect(this.[successMessage], description).toBeVisible();
  }

  async assertErrorState(description = 'Error state should be visible'): Promise<void> {
    await expect(this.[errorMessage], description).toBeVisible();
  }
}
```

### Step 4 — File Placement & Export

1. Save the file as `pages/[PageName]Page.ts`.
2. If `pages/index.ts` exists, add an export:
   ```typescript
   export { [PageName]Page } from './[PageName]Page';
   ```

### Step 5 — Verify Types

Run `npm run typecheck` to confirm the generated class compiles without errors.

### Step 6 — Update AGENTS.md

If this is the first POM for a significant new area of the app, add a note to the
"Target Application Context" section of `AGENTS.md`.

---

## Airlib Application Pages

| Page | Notes |
|------|-------|
| Home / Map View | Primary landing page with interactive air quality map |
| Location Search | Autocomplete search for cities/addresses |
| Air Quality Detail | Data overlays, legends, time-series charts |
| Export / Download | Data export controls (if present) |
