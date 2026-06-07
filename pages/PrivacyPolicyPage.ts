import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * PrivacyPolicyPage — Page Object Model for https://www.airlib.co/privacypolicy
 */
export class PrivacyPolicyPage extends BasePage {
  readonly pageHeading: Locator;
  readonly policyContent: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { level: 1 }).first();
    this.policyContent = page.getByText(/privacy policy|personal data|information we collect/i).first();
  }

  getPath(): string {
    return '/privacypolicy';
  }

  async assertPageLoaded(description = 'Privacy Policy page should load'): Promise<void> {
    await expect(this.page, description).toHaveURL(/privacypolicy/);
    await this.waitForHydration();
  }

  async assertPolicyContentVisible(description = 'Privacy policy content should be visible'): Promise<void> {
    await expect(this.pageHeading, description).toBeVisible();
  }
}
