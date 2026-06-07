import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage — abstract base class for all Page Object Models.
 *
 * Provides:
 *  - Common navigation (goto, waitForLoad)
 *  - Shared assertions (title, URL, page readiness)
 *  - Wix-specific helpers (waitForHydration)
 */
export abstract class BasePage {
  readonly page: Page;

  // Shared structural locators present on every Airlib page
  readonly siteHeader: Locator;
  readonly siteFooter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.siteHeader = page.locator('#SITE_HEADER, [data-testid="site-header"], header').first();
    this.siteFooter = page.locator('#SITE_FOOTER, [data-testid="site-footer"], footer').first();
  }

  /** Navigate to the page and wait for full JS hydration. */
  async navigate(): Promise<void> {
    await this.page.goto(this.getPath(), { waitUntil: 'domcontentloaded' });
    await this.waitForHydration();
  }

  /** Returns the relative URL path for this page. */
  abstract getPath(): string;

  /**
   * Waits for Wix Thunderbolt hydration to complete.
   * Wix fires a custom 'tbReady' event and sets window.thunderboltTag = "QA_READY".
   */
  async waitForHydration(): Promise<void> {
    await this.page.waitForFunction(
      () => document.readyState === 'complete',
      { timeout: 20_000 }
    );
  }

  /** Asserts the page title contains the expected substring. */
  async assertTitleContains(expected: string, description?: string): Promise<void> {
    await expect(
      this.page,
      description ?? `Page title should contain "${expected}"`
    ).toHaveTitle(new RegExp(expected, 'i'));
  }

  /** Asserts the current URL matches the given path exactly or as regex. */
  async assertUrl(pathOrPattern: string | RegExp, description?: string): Promise<void> {
    await expect(
      this.page,
      description ?? 'URL should match expected path'
    ).toHaveURL(pathOrPattern);
  }

  /** Asserts the page header (site navigation) is visible. */
  async assertHeaderVisible(description = 'Site header should be visible'): Promise<void> {
    await expect(this.siteHeader, description).toBeVisible();
  }

  /** Asserts no console errors occurred. Register before navigation for best results. */
  async assertNoConsoleErrors(errors: string[]): Promise<void> {
    expect(
      errors,
      `Page should have no console errors, found: ${errors.join(', ')}`
    ).toHaveLength(0);
  }
}
