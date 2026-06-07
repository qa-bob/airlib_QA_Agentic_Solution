/**
 * Functional Tests — Automotive Page
 *
 * Verifies the Automotive page loads and displays automotive-specific content.
 *
 * Tags: @functional
 */
import { test, expect } from '@playwright/test';
import { AutomotivePage } from '../../pages';

test.describe('Automotive Page @functional', () => {

  let automotivePage: AutomotivePage;

  test.beforeEach(async ({ page }) => {
    automotivePage = new AutomotivePage(page);
    await automotivePage.navigate();
  });

  test('should load the Automotive page @functional', async () => {
    await automotivePage.assertPageLoaded();
  });

  test('should display a page heading @functional', async () => {
    await automotivePage.assertHeadingVisible();
  });

  test('should have page content related to automotive @functional', async ({ page }) => {
    const automotiveContent = page.getByText(
      /automotive|in-cabin|car|oem|vehicle|recirculation|hvac/i
    ).first();
    await expect(
      automotiveContent,
      'Automotive page should contain automotive-related content'
    ).toBeVisible();
  });

  test('should display a contact or inquiry call-to-action @functional', async () => {
    await automotivePage.assertContactCtaVisible();
  });

  test('should have a non-empty page title @functional', async ({ page }) => {
    const title = await page.title();
    expect(title.length, 'Page title should not be empty').toBeGreaterThan(0);
  });

  test('should not have broken images (all img elements have a src) @functional', async ({ page }) => {
    const images = await page.locator('img').all();
    for (const img of images) {
      const src = await img.getAttribute('src');
      expect(src, 'Image element should have a src attribute').toBeTruthy();
    }
  });
});
