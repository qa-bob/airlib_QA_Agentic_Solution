import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * NewsPage — Page Object Model for https://www.airlib.co/news
 *
 * Wix blog/news listing page.
 */
export class NewsPage extends BasePage {
  readonly pageHeading: Locator;
  readonly articleList: Locator;
  readonly firstArticleLink: Locator;
  readonly articleCards: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { level: 1 }).first();
    // Wix blog renders articles as list items or article elements
    this.articleList = page.locator('article, [data-hook="post-list-item"], [class*="blog"]').first();
    this.articleCards = page.locator('article, [data-hook="post-list-item"]');
    this.firstArticleLink = page.locator('article a, [data-hook="post-list-item"] a').first();
  }

  getPath(): string {
    return '/news';
  }

  async assertPageLoaded(description = 'News page should load'): Promise<void> {
    await expect(this.page, description).toHaveURL(/\/news/);
    await this.waitForHydration();
  }

  async assertNewsContentVisible(description = 'News content should be visible'): Promise<void> {
    await expect(this.pageHeading, description).toBeVisible();
  }

  async getArticleCount(): Promise<number> {
    return this.articleCards.count();
  }
}
