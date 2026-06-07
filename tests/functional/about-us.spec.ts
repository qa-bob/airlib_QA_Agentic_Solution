/**
 * Functional Tests — About Us Page
 *
 * Verifies the About Us page content accurately represents the company.
 *
 * Tags: @functional
 */
import { test, expect } from '@playwright/test';
import { AboutUsPage } from '../../pages';

test.describe('About Us Page @functional', () => {

  let aboutPage: AboutUsPage;

  test.beforeEach(async ({ page }) => {
    aboutPage = new AboutUsPage(page);
    await aboutPage.navigate();
  });

  test('should load the About Us page @functional', async () => {
    await aboutPage.assertPageLoaded();
  });

  test('should display a page heading @functional', async ({ page }) => {
    const heading = page.getByRole('heading').first();
    await expect(heading, 'About Us page should have a heading').toBeVisible();
  });

  test('should mention that Airlib is a SaaS company @functional', async () => {
    await aboutPage.assertCompanyInfoVisible();
  });

  test('should display the company founding year (2015) @functional', async () => {
    await aboutPage.assertFoundingYearVisible();
  });

  test('should display the mission statement about reducing traffic pollution exposure @functional', async () => {
    await aboutPage.assertMissionVisible();
  });

  test('should mention automotive air quality management @functional', async ({ page }) => {
    const automotiveContent = page.getByText(/automotive|in-cabin|car oem/i).first();
    await expect(
      automotiveContent,
      'About page should mention automotive air quality management'
    ).toBeVisible();
  });

  test('should mention Scottsdale Arizona headquarters @functional', async ({ page }) => {
    const locationContent = page.getByText(/scottsdale|arizona/i).first();
    await expect(
      locationContent,
      'About page should mention Scottsdale, Arizona headquarters'
    ).toBeVisible();
  });

  test('should have a non-empty page title @functional', async ({ page }) => {
    const title = await page.title();
    expect(title.length, 'Page title should not be empty').toBeGreaterThan(0);
  });
});
