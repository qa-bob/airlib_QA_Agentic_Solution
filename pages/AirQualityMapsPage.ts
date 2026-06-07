import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * AirQualityMapsPage — Page Object Model for https://www.airlib.co/airqualitymaps
 *
 * Covers the air quality maps data/information page.
 */
export class AirQualityMapsPage extends BasePage {
  readonly pageHeading: Locator;
  readonly contentSection: Locator;
  readonly mapRelatedContent: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { level: 1 }).first();
    this.contentSection = page.locator('[data-testid="page"], #SITE_PAGES').first();
    this.mapRelatedContent = page.getByText(/air quality|pollution|maps/i).first();
  }

  getPath(): string {
    return '/airqualitymaps';
  }

  async assertPageLoaded(description = 'Air Quality Maps page should load'): Promise<void> {
    await expect(this.page, description).toHaveURL(/airqualitymaps/);
    await this.waitForHydration();
  }

  async assertHeadingVisible(description = 'Air Quality Maps heading should be visible'): Promise<void> {
    await expect(this.pageHeading, description).toBeVisible();
  }

  async assertAirQualityContentVisible(description = 'Air quality related content should be visible'): Promise<void> {
    await expect(this.mapRelatedContent, description).toBeVisible();
  }
}
