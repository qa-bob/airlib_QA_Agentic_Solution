/**
 * Functional Tests — News Page
 *
 * Verifies the News/Blog page loads and displays articles.
 *
 * Tags: @functional
 */
import { test, expect } from '@playwright/test';
import { NewsPage } from '../../pages';

test.describe('News Page @functional', () => {

  let newsPage: NewsPage;

  test.beforeEach(async ({ page }) => {
    newsPage = new NewsPage(page);
    await newsPage.navigate();
  });

  test('should load the News page @functional', async () => {
    await newsPage.assertPageLoaded();
  });

  test('should display a page heading @functional', async () => {
    await newsPage.assertNewsContentVisible();
  });

  test('should have non-empty body text @functional', async ({ page }) => {
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.trim().length, 'News page body text should not be empty').toBeGreaterThan(50);
  });

  test('should have a non-empty page title @functional', async ({ page }) => {
    const title = await page.title();
    expect(title.length, 'News page title should not be empty').toBeGreaterThan(0);
  });

  test('should contain at least one clickable link (article or post link) @functional', async ({ page }) => {
    // Wix blog renders article links — there should be at least one
    const links = page.getByRole('link');
    const count = await links.count();
    expect(count, 'News page should have at least one link').toBeGreaterThan(0);
  });
});
