import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * MapsPage — Page Object Model for https://www.airlib.co/maps
 *
 * The interactive map viewer page — may embed an external map widget.
 */
export class MapsPage extends BasePage {
  readonly pageHeading: Locator;
  readonly mapContainer: Locator;
  readonly iframeOrCanvas: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { level: 1 }).first();
    // Map pages often render an embedded iframe or canvas element
    this.mapContainer = page.locator('iframe, canvas, [class*="map"], [id*="map"]').first();
    this.iframeOrCanvas = page.locator('iframe, canvas').first();
  }

  getPath(): string {
    return '/maps';
  }

  async assertPageLoaded(description = 'Maps page should load'): Promise<void> {
    await expect(this.page, description).toHaveURL(/\/maps/);
    await this.waitForHydration();
  }

  async assertMapContainerPresent(description = 'Map container or iframe should be present'): Promise<void> {
    await expect(this.mapContainer, description).toBeAttached();
  }
}
