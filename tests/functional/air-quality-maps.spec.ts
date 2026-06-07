/**
 * Functional Tests — Air Quality Maps Page
 *
 * Verifies the Air Quality Maps page loads and contains relevant content.
 *
 * Tags: @functional
 */
import { test, expect } from '@playwright/test';
import { AirQualityMapsPage } from '../../pages';

test.describe('Air Quality Maps Page @functional', () => {

  let aqMapsPage: AirQualityMapsPage;

  test.beforeEach(async ({ page }) => {
    aqMapsPage = new AirQualityMapsPage(page);
    await aqMapsPage.navigate();
  });

  test('should load the Air Quality Maps page @functional', async () => {
    await aqMapsPage.assertPageLoaded();
  });

  test('should display a page heading @functional', async () => {
    await aqMapsPage.assertHeadingVisible();
  });

  test('should contain air quality related content @functional', async () => {
    await aqMapsPage.assertAirQualityContentVisible();
  });

  test('should contain content about maps or geographic data @functional', async ({ page }) => {
    const geoContent = page.getByText(
      /map|geographic|resolution|city|neighborhood|street|location/i
    ).first();
    await expect(
      geoContent,
      'Air Quality Maps page should contain geographic/map related content'
    ).toBeVisible();
  });

  test('should have a non-empty page title @functional', async ({ page }) => {
    const title = await page.title();
    expect(title.length, 'Page title should not be empty').toBeGreaterThan(0);
  });
});
