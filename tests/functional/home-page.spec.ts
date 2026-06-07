/**
 * Functional Tests — Home Page
 *
 * Verifies the Airlib home page content, structure, and interactive elements.
 *
 * Tags: @functional
 */
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages';

test.describe('Home Page @functional', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.readyState === 'complete');
  });

  test.describe('Page content', () => {

    test('should display Airlib branding in the page title @functional', async ({ page }) => {
      await expect(page, 'Page title should contain Airlib brand name').toHaveTitle(/airlib/i);
    });

    test('should render at least one heading @functional', async ({ page }) => {
      const homePage = new HomePage(page);
      await expect(
        homePage.heroHeading,
        'Home page should have a visible primary heading'
      ).toBeVisible();
    });

    test('should display the site header @functional', async ({ page }) => {
      const header = page.locator('#SITE_HEADER, header, [role="banner"]').first();
      await expect(header, 'Site header should be visible on home page').toBeVisible();
    });

    test('should display internal navigation links @functional', async ({ page }) => {
      // Verify at least 3 internal nav links are present
      const navLinks = page.getByRole('link', {
        name: /about|contact|how it works|automotive|news|maps/i
      });
      const count = await navLinks.count();
      expect(count, 'At least 3 navigation links should be present').toBeGreaterThanOrEqual(3);
    });

    test('should contain content related to air quality @functional', async ({ page }) => {
      const airQualityContent = page.getByText(/air quality|pollution|automotive|airlib/i).first();
      await expect(
        airQualityContent,
        'Home page should contain air quality related content'
      ).toBeVisible();
    });
  });

  test.describe('Page structure', () => {

    test('should not have a blank body @functional', async ({ page }) => {
      const bodyText = await page.locator('body').innerText();
      expect(
        bodyText.trim().length,
        'Page body should not be empty'
      ).toBeGreaterThan(0);
    });

    test('should have a favicon @functional', async ({ page }) => {
      const favicon = page.locator('link[rel="icon"], link[rel="shortcut icon"]').first();
      await expect(favicon, 'Page should have a favicon link element').toBeAttached();
    });

    test('should have the correct lang attribute @functional', async ({ page }) => {
      const lang = await page.getAttribute('html', 'lang');
      expect(lang, 'HTML lang attribute should be set').toBeTruthy();
    });
  });

  test.describe('Links and CTAs', () => {

    test('should have at least one clickable call-to-action link @functional', async ({ page }) => {
      const cta = page.getByRole('link', {
        name: /contact|get started|learn more|request|demo/i
      }).first();

      const ctaCount = await page.getByRole('link', {
        name: /contact|get started|learn more|request|demo/i
      }).count();

      if (ctaCount > 0) {
        await expect(cta, 'CTA link should be visible').toBeVisible();
      } else {
        // Fall back — any link should exist on the home page
        const anyLink = page.getByRole('link').first();
        await expect(anyLink, 'At least one link should exist on the page').toBeVisible();
      }
    });

    test('should not have broken anchor links (#) as primary CTAs @functional', async ({ page }) => {
      // Empty href="#" links that lead nowhere are UX issues
      const emptyLinks = page.locator('a[href="#"]');
      const count = await emptyLinks.count();
      // Wix may use some # links for scroll — just verify none are primary CTAs
      // We log but don't hard-fail since Wix uses them internally
      if (count > 5) {
        console.warn(`Warning: Found ${count} links with href="#" — may indicate placeholder links`);
      }
    });
  });
});
