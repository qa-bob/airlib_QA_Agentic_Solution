import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage — Page Object Model for https://www.airlib.co/
 */
export class HomePage extends BasePage {
  readonly heroSection: Locator;
  readonly heroHeading: Locator;
  readonly heroCta: Locator;
  readonly learnMoreLink: Locator;
  readonly contactLink: Locator;

  constructor(page: Page) {
    super(page);
    // Hero / main banner area — Wix renders the first prominent heading
    this.heroSection = page.locator('#SITE_PAGES, [data-testid="page"]').first();
    this.heroHeading = page.getByRole('heading', { level: 1 }).first();
    this.heroCta = page.getByRole('link', { name: /contact|get started|learn more/i }).first();
    this.learnMoreLink = page.getByRole('link', { name: /learn more/i }).first();
    this.contactLink = page.getByRole('link', { name: /contact/i }).first();
  }

  getPath(): string {
    return '/';
  }

  /** Asserts the home page has loaded with visible heading content. */
  async assertPageLoaded(description = 'Home page should load with hero heading'): Promise<void> {
    await expect(this.heroHeading, description).toBeVisible();
  }

  /** Asserts the page title identifies Airlib. */
  async assertAirlibBranding(): Promise<void> {
    await this.assertTitleContains('Airlib');
  }
}
