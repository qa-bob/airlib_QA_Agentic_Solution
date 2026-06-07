/**
 * Regression Tests — All Pages Load
 *
 * Full regression sweep across all 9 pages. Verifies each page:
 *  - Returns HTTP 200
 *  - Has a non-empty title
 *  - Has a non-empty body
 *  - Has at least one heading
 *  - Has site navigation present
 *
 * Run nightly or before releases.
 *
 * Tags: @regression
 */
import { test, expect } from '@playwright/test';
import { SITE_ROUTES } from '../../fixtures';

test.describe('All Pages Load @regression', () => {

  for (const route of SITE_ROUTES) {
    test.describe(`${route.label} (${route.path})`, () => {

      test(`should return HTTP 200 @regression`, async ({ page }) => {
        const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
        expect(
          response?.status(),
          `${route.label} should return HTTP 200`
        ).toBe(200);
      });

      test(`should have a non-empty page title @regression`, async ({ page }) => {
        await page.goto(route.path, { waitUntil: 'domcontentloaded' });
        const title = await page.title();
        expect(
          title.trim().length,
          `${route.label} should have a non-empty title`
        ).toBeGreaterThan(0);
      });

      test(`should have a non-empty body @regression`, async ({ page }) => {
        await page.goto(route.path, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => document.readyState === 'complete');
        const bodyText = await page.locator('body').innerText();
        expect(
          bodyText.trim().length,
          `${route.label} body should not be empty`
        ).toBeGreaterThan(0);
      });

      test(`should render at least one heading @regression`, async ({ page }) => {
        await page.goto(route.path, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => document.readyState === 'complete');
        const headings = page.getByRole('heading');
        const count = await headings.count();
        expect(count, `${route.label} should have at least one heading`).toBeGreaterThan(0);
      });

      test(`should have at least one navigation link @regression`, async ({ page }) => {
        await page.goto(route.path, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => document.readyState === 'complete');
        const links = page.getByRole('link');
        const count = await links.count();
        expect(count, `${route.label} should have navigation links`).toBeGreaterThan(0);
      });
    });
  }
});
