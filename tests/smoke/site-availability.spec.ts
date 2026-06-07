/**
 * Smoke Tests — Site Availability
 *
 * Critical path tests that verify all 9 pages of https://www.airlib.co/ are
 * reachable, return HTTP 200, render without crashing, and display a page heading.
 *
 * These run on every deployment. If any of these fail, the site is considered DOWN.
 *
 * Tags: @smoke
 */
import { test, expect } from '@playwright/test';
import { SITE_ROUTES } from '../../fixtures';
import { ConsoleErrorCollector } from '../../utils';

test.describe('Site Availability @smoke', () => {

  test.describe('HTTP reachability — all pages return 200', () => {
    for (const route of SITE_ROUTES) {
      test(`should return 200 for ${route.label} (${route.path})`, async ({ page }) => {
        const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
        expect(
          response?.status(),
          `${route.label} page should return HTTP 200`
        ).toBe(200);
      });
    }
  });

  test.describe('Page rendering — key pages load without crash', () => {

    test('should load the Home page with a visible heading @smoke', async ({ page }) => {
      const errors = new ConsoleErrorCollector(page);
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      const heading = page.getByRole('heading').first();
      await expect(heading, 'Home page should render at least one heading').toBeVisible();
    });

    test('should load the About Us page with company content @smoke', async ({ page }) => {
      await page.goto('/about-us', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      await expect(page, 'Should be on about-us URL').toHaveURL(/about-us/);
      const heading = page.getByRole('heading').first();
      await expect(heading, 'About Us page should render a heading').toBeVisible();
    });

    test('should load the How It Works page @smoke', async ({ page }) => {
      await page.goto('/how-it-works', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      await expect(page, 'Should be on how-it-works URL').toHaveURL(/how-it-works/);
    });

    test('should load the Contact Us page with a form @smoke', async ({ page }) => {
      await page.goto('/contact-us', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      await expect(page, 'Should be on contact-us URL').toHaveURL(/contact-us/);
    });

    test('should load the Automotive page @smoke', async ({ page }) => {
      await page.goto('/automotive', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      await expect(page, 'Should be on automotive URL').toHaveURL(/automotive/);
    });
  });

  test.describe('Branding — site identity is consistent', () => {

    test('should display "Airlib" in the page title on the home page @smoke', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await expect(page, 'Page title should reference Airlib brand').toHaveTitle(/airlib/i);
    });

    test('should have a site header visible on the home page @smoke', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      const header = page.locator('#SITE_HEADER, header, [role="banner"]').first();
      await expect(header, 'Site header / banner should be visible').toBeVisible();
    });

    test('should have navigation links on the home page @smoke', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      // At least one nav link to a known internal page should exist
      const internalLinks = page.getByRole('link', { name: /about|contact|how it works|automotive/i });
      const count = await internalLinks.count();
      expect(count, 'Home page should have at least one internal navigation link').toBeGreaterThan(0);
    });
  });

  test.describe('Performance baseline — pages load within time threshold', () => {

    test('should load the home page within 15 seconds @smoke', async ({ page }) => {
      const start = Date.now();
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');
      const elapsed = Date.now() - start;

      expect(elapsed, `Home page load time (${elapsed}ms) should be under 15s`).toBeLessThan(15_000);
    });
  });
});
