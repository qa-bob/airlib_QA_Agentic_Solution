/**
 * Functional Tests — How It Works Page
 *
 * Verifies the How It Works page loads and displays explanatory content.
 *
 * Tags: @functional
 */
import { test, expect } from '@playwright/test';
import { HowItWorksPage } from '../../pages';

test.describe('How It Works Page @functional', () => {

  let howItWorksPage: HowItWorksPage;

  test.beforeEach(async ({ page }) => {
    howItWorksPage = new HowItWorksPage(page);
    await howItWorksPage.navigate();
  });

  test('should load the How It Works page @functional', async () => {
    await howItWorksPage.assertPageLoaded();
  });

  test('should display a page heading @functional', async () => {
    await howItWorksPage.assertHeadingVisible();
  });

  test('should have page content (non-empty body text) @functional', async ({ page }) => {
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.trim().length, 'Page should not have empty body text').toBeGreaterThan(100);
  });

  test('should contain technology or process related content @functional', async ({ page }) => {
    const techContent = page.getByText(
      /air quality|sensor|data|map|technology|pollution|algorithm|patented/i
    ).first();
    await expect(
      techContent,
      'How It Works page should contain technology/process content'
    ).toBeVisible();
  });

  test('should have a non-empty page title @functional', async ({ page }) => {
    const title = await page.title();
    expect(title.length, 'Page title should not be empty').toBeGreaterThan(0);
  });
});
