---
name: accessibility-audit
description: WCAG 2.1 AA accessibility audit workflow using @axe-core/playwright. Use this skill when asked to run an accessibility audit, check WCAG compliance, or write accessibility tests for a page or component.
---

## Accessibility Audit Workflow

### Step 1 — Setup Check

Verify `@axe-core/playwright` is installed:

```bash
npm list @axe-core/playwright
```

If not installed:
```bash
npm install --save-dev @axe-core/playwright
```

### Step 2 — Write the Accessibility Test

Create a spec file in `tests/functional/` (or the relevant directory) with this pattern:

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('[Page Name] — Accessibility @accessibility', () => {

  test('should have no WCAG 2.1 AA violations on initial load', async ({ page }) => {
    await page.goto('[URL]');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });

  test('should have no violations after [user interaction]', async ({ page }) => {
    await page.goto('[URL]');
    // Perform interaction that changes DOM state
    await page.getByRole('[role]', { name: '[name]' }).click();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });
});

function formatViolations(violations: AxeResults['violations']): string {
  return violations.map(v =>
    `[${v.impact}] ${v.id}: ${v.description}\n  Nodes: ${v.nodes.map(n => n.html).join(', ')}`
  ).join('\n\n');
}
```

### Step 3 — Interpret Results

When violations are found, report them in this format:

```
VIOLATION: [rule-id]
Impact: critical | serious | moderate | minor
Description: [what the rule checks]
WCAG Criterion: [e.g., 1.1.1 Non-text Content]
Affected elements: [HTML snippets]
Suggested fix: [actionable recommendation]
```

### Step 4 — Prioritize Fixes

Address violations by impact level:
1. **critical** — screen reader completely blocked; fix immediately
2. **serious** — significant barrier for assistive technology users; fix in current sprint
3. **moderate** — causes confusion or difficulty; fix in next sprint
4. **minor** — best practice improvement; log as technical debt

### Step 5 — Exclude Known Issues

If a violation is a known third-party issue (e.g., embedded map iframe), exclude it explicitly:

```typescript
const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa'])
  .exclude('#third-party-map-iframe')
  .analyze();
```

Always comment why an exclusion exists.

### Airlib-Specific Areas to Audit

- Map container and overlay controls (keyboard navigability)
- Location search input and autocomplete dropdown
- Air quality data legends and color contrast
- Navigation menu (mobile and desktop)
- Any modal dialogs or popups
