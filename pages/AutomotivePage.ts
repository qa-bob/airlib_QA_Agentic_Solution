import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * AutomotivePage — Page Object Model for https://www.airlib.co/automotive
 *
 * This page covers Airlib's automotive in-cabin air quality solutions.
 */
export class AutomotivePage extends BasePage {
  readonly pageHeading: Locator;
  readonly contentSection: Locator;
  readonly contactCta: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { level: 1 }).first();
    this.contentSection = page.locator('[data-testid="page"], #SITE_PAGES').first();
    this.contactCta = page.getByRole('link', { name: /contact/i }).first();
  }

  getPath(): string {
    return '/automotive';
  }

  async assertPageLoaded(description = 'Automotive page should load'): Promise<void> {
    await expect(this.page, description).toHaveURL(/automotive/);
    await this.waitForHydration();
  }

  async assertHeadingVisible(description = 'Automotive page heading should be visible'): Promise<void> {
    await expect(this.pageHeading, description).toBeVisible();
  }

  async assertContactCtaVisible(description = 'Contact CTA should be visible on Automotive page'): Promise<void> {
    await expect(this.contactCta, description).toBeVisible();
  }
}
