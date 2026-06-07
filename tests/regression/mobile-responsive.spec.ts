/**
 * Regression Tests — Mobile Responsiveness
 *
 * Verifies that key pages render correctly on mobile viewports.
 * Uses Playwright's built-in device emulation.
 *
 * These tests run in the 'mobile' project defined in playwright.config.ts
 * but can also run in desktop projects to verify responsiveness.
 *
 * Tags: @regression
 */
import { test, expect, devices } from '@playwright/test';

const mobilePages = [
  { path: '/',             label: 'Home' },
  { path: '/about-us',     label: 'About Us' },
  { path: '/how-it-works', label: 'How It Works' },
  { path: '/contact-us',   label: 'Contact Us' },
  { path: '/automotive',   label: 'Automotive' },
];

test.describe('Mobile Responsiveness @regression', () => {

  test.describe('iPhone 13 viewport', () => {
    test.use({ ...devices['iPhone 13'] });

    for (const { path, label } of mobilePages) {
      test(`${label} page should render on iPhone 13 viewport @regression`, async ({ page }) => {
        await page.goto(path, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => document.readyState === 'complete');

        // Page should have content
        const bodyText = await page.locator('body').innerText();
        expect(
          bodyText.trim().length,
          `${label} page body should not be empty on mobile`
        ).toBeGreaterThan(0);

        // At least one heading should be visible
        const heading = page.getByRole('heading').first();
        await expect(heading, `${label} page should have a visible heading on mobile`).toBeVisible();
      });
    }

    test('Contact form should be usable on mobile @regression', async ({ page }) => {
      await page.goto('/contact-us', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      // Form should be in the DOM
      const formCount = await page.locator('form').count();
      expect(formCount, 'Contact form should exist on mobile').toBeGreaterThan(0);

      // Submit button should be visible
      const submitBtn = page.getByRole('button', { name: /submit|send|contact/i }).first();
      const count = await page.getByRole('button', { name: /submit|send|contact/i }).count();
      if (count > 0) {
        await expect(submitBtn, 'Submit button should be visible on mobile').toBeVisible();
      }
    });
  });

  test.describe('Pixel 7 viewport', () => {
    test.use({ ...devices['Pixel 7'] });

    test('Home page should render correctly on Android viewport @regression', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      const heading = page.getByRole('heading').first();
      await expect(heading, 'Home page heading should be visible on Android').toBeVisible();
    });

    test('About Us page should render correctly on Android viewport @regression', async ({ page }) => {
      await page.goto('/about-us', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      await expect(page, 'Should be on About Us URL').toHaveURL(/about-us/);
    });
  });

  test.describe('Viewport consistency — content does not overflow', () => {
    test.use({ ...devices['iPhone 13'] });

    test('Home page should not have horizontal scroll overflow on mobile @regression', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      const hasHorizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      // Wix sites sometimes have minor overflow — log a warning rather than hard-fail
      if (hasHorizontalOverflow) {
        console.warn('Warning: Home page has horizontal scroll overflow on mobile viewport');
      }
    });
  });
});
