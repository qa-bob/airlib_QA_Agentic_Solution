import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * AboutUsPage — Page Object Model for https://www.airlib.co/about-us
 */
export class AboutUsPage extends BasePage {
  readonly pageHeading: Locator;
  readonly companyDescription: Locator;
  readonly foundedMention: Locator;
  readonly missionStatement: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { level: 1 }).first();
    // Key content landmarks based on known page text
    this.companyDescription = page.getByText(/software as a service/i).first();
    this.foundedMention = page.getByText(/founded in 2015/i).first();
    this.missionStatement = page.getByText(/reduce exposure to traffic pollution/i).first();
  }

  getPath(): string {
    return '/about-us';
  }

  async assertPageLoaded(description = 'About Us page should load'): Promise<void> {
    await expect(this.page, description).toHaveURL(/about-us/);
    await this.waitForHydration();
  }

  async assertCompanyInfoVisible(): Promise<void> {
    await expect(
      this.companyDescription,
      'Company SaaS description should be visible'
    ).toBeVisible();
  }

  async assertFoundingYearVisible(): Promise<void> {
    await expect(
      this.foundedMention,
      'Founded in 2015 text should be visible'
    ).toBeVisible();
  }

  async assertMissionVisible(): Promise<void> {
    await expect(
      this.missionStatement,
      'Mission statement about traffic pollution should be visible'
    ).toBeVisible();
  }
}
