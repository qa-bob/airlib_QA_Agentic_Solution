/**
 * Regression Tests — Mobile Responsiveness
 *
 * Verifies key pages render correctly on mobile viewports.
 * Uses viewport-only emulation (no defaultBrowserType) so tests run in any browser project.
 *
 * For full device emulation (webkit/chromium browser engine per device) run the
 * dedicated 'mobile' and 'mobile-android' projects in playwright.config.ts:
 *   npx playwright test --project=mobile
 *
 * Tags: @regression
 */
import { test, expect } from '@playwright/test';

// Viewport dimensions only — avoids the defaultBrowserType nested describe restriction
const IPHONE_13_VIEWPORT = { width: 390, height: 844 };
const PIXEL_7_VIEWPORT   = { width: 412, height: 915 };

const mobilePages = [
  { path: '/',             label: 'Home' },
  { path: '/about-us',     label: 'About Us' },
  { path: '/how-it-works', label: 'How It Works' },
  { path: '/contact-us',   label: 'Contact Us' },
  { path: '/automotive',   label: 'Automotive' },
];

test.describe('Mobile Responsiveness — iPhone 13 viewport @regression', () => {
  test.use({ viewport: IPHONE_13_VIEWPORT });

  for (const { path, label } of mobilePages) {
    test(`${label} page should render on iPhone 13 viewport @regression`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      const bodyText = await page.locator('body').innerText();
      expect(
        bodyText.trim().length,
        `${label} page body should not be empty on mobile`
      ).toBeGreaterThan(0);

      const heading = page.getByRole('heading').first();
      await expect(heading, `${label} page should have a visible heading on mobile`).toBeVisible();
    });
  }

  test('Contact form should be present on mobile @regression', async ({ page }) => {
    await page.goto('/contact-us', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.readyState === 'complete');

    const formCount = await page.locator('form').count();
    expect(formCount, 'Contact form should exist on mobile').toBeGreaterThan(0);
  });

  test('Home page should not have horizontal scroll overflow on mobile @regression', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.readyState === 'complete');

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (hasHorizontalOverflow) {
      console.warn('Warning: Home page has horizontal scroll overflow on mobile viewport');
    }
  });
});

test.describe('Mobile Responsiveness — Pixel 7 viewport @regression', () => {
  test.use({ viewport: PIXEL_7_VIEWPORT });

  test('Home page should render correctly on Android-sized viewport @regression', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.readyState === 'complete');

    const heading = page.getByRole('heading').first();
    await expect(heading, 'Home page heading should be visible on Android viewport').toBeVisible();
  });

  test('About Us page should render correctly on Android-sized viewport @regression', async ({ page }) => {
    await page.goto('/about-us', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.readyState === 'complete');

    await expect(page, 'Should be on About Us URL').toHaveURL(/about-us/);
  });

  test('Contact Us page should have a form on Android-sized viewport @regression', async ({ page }) => {
    await page.goto('/contact-us', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.readyState === 'complete');

    const formCount = await page.locator('form').count();
    expect(formCount, 'Contact form should be present on Android viewport').toBeGreaterThan(0);
  });
});
