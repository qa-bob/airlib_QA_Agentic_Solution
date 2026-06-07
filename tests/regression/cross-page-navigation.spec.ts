/**
 * Regression Tests — Cross-Page Navigation
 *
 * Verifies that users can successfully navigate between every major page
 * from the home page via in-page links, and that each destination is correct.
 *
 * Run nightly or before releases.
 *
 * Tags: @regression
 */
import { test, expect } from '@playwright/test';

const navigationFlows = [
  {
    label: 'Home → About Us → How It Works',
    steps: [
      { from: '/',          navText: /about us/i,    expectedUrl: /about-us/ },
      { from: '/about-us',  navText: /how it works/i, expectedUrl: /how-it-works/ },
    ],
  },
  {
    label: 'Home → Contact Us',
    steps: [
      { from: '/', navText: /contact/i, expectedUrl: /contact-us/ },
    ],
  },
  {
    label: 'Home → Automotive',
    steps: [
      { from: '/', navText: /automotive/i, expectedUrl: /automotive/ },
    ],
  },
  {
    label: 'Home → News',
    steps: [
      { from: '/', navText: /^news$/i, expectedUrl: /\/news/ },
    ],
  },
];

test.describe('Cross-Page Navigation @regression', () => {

  for (const flow of navigationFlows) {
    test(`should navigate: ${flow.label} @regression`, async ({ page }) => {
      for (const step of flow.steps) {
        await page.goto(step.from, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => document.readyState === 'complete');

        const link = page.getByRole('link', { name: step.navText }).first();
        await expect(
          link,
          `Nav link matching "${step.navText.source ?? step.navText}" should be visible on ${step.from}`
        ).toBeVisible();

        await link.click();
        await page.waitForFunction(() => document.readyState === 'complete');
        await expect(
          page,
          `Should land on correct page: ${step.expectedUrl}`
        ).toHaveURL(step.expectedUrl);
      }
    });
  }

  test('should navigate through all main pages sequentially @regression', async ({ page }) => {
    const pages = [
      { path: '/',               pattern: /airlib\.co\/?$/  },
      { path: '/about-us',       pattern: /about-us/        },
      { path: '/how-it-works',   pattern: /how-it-works/    },
      { path: '/automotive',     pattern: /automotive/      },
      { path: '/airqualitymaps', pattern: /airqualitymaps/  },
      { path: '/news',           pattern: /\/news/          },
      { path: '/contact-us',     pattern: /contact-us/      },
    ];

    for (const { path, pattern } of pages) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.readyState === 'complete');
      await expect(page, `URL should match pattern for ${path}`).toHaveURL(pattern);
    }
  });

  test('should preserve page state across navigation and return @regression', async ({ page }) => {
    // Navigate to home, go to About Us, come back — home should still render
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.readyState === 'complete');

    const homeHeadingText = await page.getByRole('heading').first().innerText();

    await page.goto('/about-us', { waitUntil: 'domcontentloaded' });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.readyState === 'complete');

    const returnHeadingText = await page.getByRole('heading').first().innerText();
    expect(returnHeadingText, 'Home heading should be the same after returning').toBe(homeHeadingText);
  });
});
