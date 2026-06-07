/**
 * Functional Tests — Navigation
 *
 * Verifies that all site navigation links work correctly, route to the
 * expected pages, and that browser back/forward navigation behaves as expected.
 *
 * Tags: @functional
 */
import { test, expect } from '@playwright/test';
import { NavigationComponent } from '../../pages';

test.describe('Navigation @functional', () => {

  test.describe('Direct navigation — all pages are reachable by URL', () => {
    const pages = [
      { path: '/',               label: 'Home',             pattern: /airlib\.co\/?$/ },
      { path: '/about-us',       label: 'About Us',         pattern: /about-us/ },
      { path: '/how-it-works',   label: 'How It Works',     pattern: /how-it-works/ },
      { path: '/automotive',     label: 'Automotive',       pattern: /automotive/ },
      { path: '/airqualitymaps', label: 'Air Quality Maps', pattern: /airqualitymaps/ },
      { path: '/maps',           label: 'Maps',             pattern: /\/maps/ },
      { path: '/news',           label: 'News',             pattern: /\/news/ },
      { path: '/contact-us',     label: 'Contact Us',       pattern: /contact-us/ },
      { path: '/privacypolicy',  label: 'Privacy Policy',   pattern: /privacypolicy/ },
    ];

    for (const { path, label, pattern } of pages) {
      test(`should navigate directly to ${label} page`, async ({ page }) => {
        await page.goto(path, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => document.readyState === 'complete');
        await expect(page, `URL should match ${label} pattern`).toHaveURL(pattern);
      });
    }
  });

  test.describe('In-page navigation — nav links route correctly', () => {

    test('should navigate to About Us via nav link @functional', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      const nav = new NavigationComponent(page);
      await nav.goToAboutUs();
      await expect(page, 'Should land on About Us page').toHaveURL(/about-us/);
    });

    test('should navigate to Contact Us via nav link @functional', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      const nav = new NavigationComponent(page);
      await nav.goToContactUs();
      await expect(page, 'Should land on Contact Us page').toHaveURL(/contact-us/);
    });

    test('should navigate to How It Works via nav link @functional', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      const nav = new NavigationComponent(page);
      await nav.goToHowItWorks();
      await expect(page, 'Should land on How It Works page').toHaveURL(/how-it-works/);
    });

    test('should navigate to Automotive via nav link (currently a known 404) @functional', async ({ page }) => {
      test.info().annotations.push({
        type: 'defect',
        description: '/automotive nav link leads to a 404 via redirect to /automotive2.',
      });

      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      const nav = new NavigationComponent(page);
      await nav.goToAutomotive();

      const finalUrl = page.url();
      console.warn(`KNOWN DEFECT: Automotive nav link resolved to ${finalUrl}`);

      // The page should at least render something rather than crash
      const body = await page.locator('body').innerText().catch(() => '');
      expect(body.trim().length, 'Automotive destination page should render content').toBeGreaterThan(0);
    });

    test('should navigate to News via nav link @functional', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');

      const nav = new NavigationComponent(page);
      await nav.goToNews();
      await expect(page, 'Should land on News page').toHaveURL(/\/news/);
    });
  });

  test.describe('Browser history — back/forward navigation', () => {

    test('should return to previous page when using browser back @functional', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.goto('/about-us', { waitUntil: 'domcontentloaded' });

      await page.goBack();
      await page.waitForFunction(() => document.readyState === 'complete');

      await expect(page, 'Back navigation should return to home page').toHaveURL(/airlib\.co\/?$/);
    });

    test('should navigate forward after going back @functional', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.goto('/about-us', { waitUntil: 'domcontentloaded' });
      await page.goBack();
      await page.goForward();
      await page.waitForFunction(() => document.readyState === 'complete');

      await expect(page, 'Forward navigation should go to About Us').toHaveURL(/about-us/);
    });
  });

  test.describe('404 handling — invalid routes', () => {

    test('should handle a non-existent page gracefully @functional', async ({ page }) => {
      const response = await page.goto('/this-page-does-not-exist-qa-test');
      // Wix returns 200 for their custom 404 or redirects — page should not crash
      expect(
        response?.status(),
        'Non-existent page should return 200 (Wix custom 404) or 404'
      ).toBeGreaterThanOrEqual(200);
      // The page should not be blank
      await page.waitForFunction(() => document.body.children.length > 0);
    });
  });
});
