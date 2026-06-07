import { Page } from '@playwright/test';

/**
 * Collects all browser console error messages during a test.
 * Register before navigation; call getErrors() afterwards.
 *
 * Usage:
 *   const collector = new ConsoleErrorCollector(page);
 *   await page.goto('/');
 *   const errors = collector.getErrors();
 */
export class ConsoleErrorCollector {
  private readonly errors: string[] = [];

  constructor(page: Page) {
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        this.errors.push(msg.text());
      }
    });
  }

  getErrors(): string[] {
    return [...this.errors];
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  clear(): void {
    this.errors.length = 0;
  }
}

/**
 * Waits for a page to fully load on a Wix Thunderbolt site.
 * Accounts for async JS hydration.
 */
export async function waitForWixPage(page: Page): Promise<void> {
  await page.waitForFunction(
    () => document.readyState === 'complete',
    { timeout: 20_000 }
  );
}

/**
 * Measures the time (in ms) for a navigation to complete.
 */
export async function measureNavigation(
  page: Page,
  action: () => Promise<void>
): Promise<number> {
  const start = Date.now();
  await action();
  return Date.now() - start;
}

/**
 * Checks whether an element is in the visible viewport.
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }, selector);
}
