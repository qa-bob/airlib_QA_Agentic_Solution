import { Page, Locator, expect } from '@playwright/test';

/**
 * NavigationComponent — represents the site-wide navigation header.
 *
 * Wix renders navigation as anchor elements within the site header.
 * These selectors use text matching to remain stable across Wix re-renders.
 */
export class NavigationComponent {
  readonly page: Page;

  readonly homeLink: Locator;
  readonly howItWorksLink: Locator;
  readonly airQualityMapsLink: Locator;
  readonly mapsLink: Locator;
  readonly automotiveLink: Locator;
  readonly newsLink: Locator;
  readonly aboutUsLink: Locator;
  readonly contactUsLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation links — matched by accessible text (case-insensitive via regex)
    this.homeLink = page.getByRole('link', { name: /^home$/i }).first();
    this.howItWorksLink = page.getByRole('link', { name: /how it works/i }).first();
    this.airQualityMapsLink = page.getByRole('link', { name: /air quality maps/i }).first();
    this.mapsLink = page.getByRole('link', { name: /^maps$/i }).first();
    this.automotiveLink = page.getByRole('link', { name: /automotive/i }).first();
    this.newsLink = page.getByRole('link', { name: /^news$/i }).first();
    this.aboutUsLink = page.getByRole('link', { name: /about us/i }).first();
    this.contactUsLink = page.getByRole('link', { name: /contact/i }).first();
  }

  /** Navigates to the How It Works page via the nav link. */
  async goToHowItWorks(): Promise<void> {
    await this.howItWorksLink.click();
    await this.page.waitForURL(/how-it-works/);
  }

  /** Navigates to the Air Quality Maps page via the nav link. */
  async goToAirQualityMaps(): Promise<void> {
    await this.airQualityMapsLink.click();
    await this.page.waitForURL(/airqualitymaps/);
  }

  /** Navigates to the Automotive page via the nav link. */
  async goToAutomotive(): Promise<void> {
    await this.automotiveLink.click();
    await this.page.waitForURL(/automotive/);
  }

  /** Navigates to the News page via the nav link. */
  async goToNews(): Promise<void> {
    await this.newsLink.click();
    await this.page.waitForURL(/news/);
  }

  /** Navigates to the About Us page via the nav link. */
  async goToAboutUs(): Promise<void> {
    await this.aboutUsLink.click();
    await this.page.waitForURL(/about-us/);
  }

  /** Navigates to the Contact Us page via the nav link. */
  async goToContactUs(): Promise<void> {
    await this.contactUsLink.click();
    await this.page.waitForURL(/contact-us/);
  }

  /** Navigates to the Maps page via the nav link. */
  async goToMaps(): Promise<void> {
    await this.mapsLink.click();
    await this.page.waitForURL(/\/maps/);
  }

  /** Asserts the navigation links are all visible. */
  async assertNavigationVisible(description = 'Primary navigation links should be visible'): Promise<void> {
    const links = [
      this.howItWorksLink,
      this.automotiveLink,
      this.aboutUsLink,
      this.contactUsLink,
    ];
    for (const link of links) {
      await expect(link, description).toBeVisible();
    }
  }
}
