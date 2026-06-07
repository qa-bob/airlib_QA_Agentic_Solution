import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HowItWorksPage — Page Object Model for https://www.airlib.co/how-it-works
 */
export class HowItWorksPage extends BasePage {
  readonly pageHeading: Locator;
  readonly contentSection: Locator;

  constructor(page: Page) {
    super(page);
    // Wix renders content headings as h2 on this page — no h1 exists
    this.pageHeading = page.getByRole('heading').first();
    this.contentSection = page.locator('[data-testid="page"], #SITE_PAGES').first();
  }

  getPath(): string {
    return '/how-it-works';
  }

  async assertPageLoaded(description = 'How It Works page should load'): Promise<void> {
    await expect(this.page, description).toHaveURL(/how-it-works/);
    await this.waitForHydration();
  }

  async assertHeadingVisible(description = 'Page heading should be visible'): Promise<void> {
    await expect(this.pageHeading, description).toBeVisible();
  }
}
