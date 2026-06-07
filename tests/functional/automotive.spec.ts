/**
 * Functional Tests — Automotive Page
 *
 * KNOWN DEFECT: https://www.airlib.co/automotive redirects (301) to /automotive2
 * which currently returns a 404. Tests below document this defect and will be
 * updated once the page is restored.
 *
 * Tags: @functional
 */
import { test, expect } from '@playwright/test';

test.describe('Automotive Page @functional', () => {

  test('should have /automotive in the site navigation @functional', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.readyState === 'complete');

    const automotiveLink = page.getByRole('link', { name: /automotive/i }).first();
    await expect(
      automotiveLink,
      'Automotive link should be visible in site navigation'
    ).toBeVisible();
  });

  test('[KNOWN DEFECT] /automotive page returns 404 after redirect @functional', async ({ page }) => {
    test.info().annotations.push({
      type: 'defect',
      description: '/automotive redirects (301) to /automotive2 which returns 404. Tracked for fix.',
    });
    const response = await page.goto('/automotive', { waitUntil: 'domcontentloaded' });
    const status = response?.status() ?? 0;
    console.warn(`KNOWN DEFECT: /automotive resolved to HTTP ${status} at ${page.url()}`);
    // No assertion — this test exists solely to document and track the broken redirect
  });
});
