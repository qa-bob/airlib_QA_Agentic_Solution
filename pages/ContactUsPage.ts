import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ContactUsPage — Page Object Model for https://www.airlib.co/contact-us
 *
 * Wix Forms-powered contact page.
 */
export class ContactUsPage extends BasePage {
  readonly pageHeading: Locator;
  readonly contactForm: Locator;

  // Form fields — Wix Forms renders standard inputs with aria-labels
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { level: 1 }).first();

    // Wix Forms container
    this.contactForm = page.locator(
      'form, [data-testid="form"], [data-hook="form-component"]'
    ).first();

    // Form fields — from live page snapshot: labels are "First Name", "Email", placeholder "Write a message"
    this.nameInput = page.getByLabel('First Name').or(page.getByPlaceholder(/first name|name/i)).first();

    this.emailInput = page.getByLabel('Email').or(page.getByPlaceholder(/email/i)).first();

    this.messageInput = page
      .getByPlaceholder(/write a message|message/i)
      .or(page.getByLabel(/message|subject/i))
      .first();

    this.submitButton = page.getByRole('button', { name: /^submit$/i }).first();

    this.successMessage = page
      .getByText(/thank you|message sent|submitted|received/i)
      .first();

    this.errorMessage = page
      .getByText(/required|please fill|cannot be empty|invalid/i)
      .first();
  }

  getPath(): string {
    return '/contact-us';
  }

  async assertPageLoaded(description = 'Contact Us page should load'): Promise<void> {
    await expect(this.page, description).toHaveURL(/contact-us/);
    await this.waitForHydration();
  }

  async assertFormVisible(description = 'Contact form should be visible'): Promise<void> {
    await expect(this.contactForm, description).toBeVisible();
  }

  /** Fills and submits the contact form with the provided data. */
  async fillAndSubmitForm(data: {
    name: string;
    email: string;
    message: string;
  }): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.messageInput.fill(data.message);
    await this.submitButton.click();
  }

  /** Fills individual fields without submitting. */
  async fillName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillMessage(message: string): Promise<void> {
    await this.messageInput.fill(message);
  }

  async assertSuccessMessageVisible(
    description = 'Success confirmation should appear after form submission'
  ): Promise<void> {
    await expect(this.successMessage, description).toBeVisible({ timeout: 15_000 });
  }

  async assertEmailFieldIsRequired(): Promise<void> {
    // Clear and blur the email field to trigger validation
    await this.emailInput.fill('');
    await this.emailInput.blur();
    await expect(
      this.errorMessage,
      'Validation error should appear when email is empty'
    ).toBeVisible();
  }
}
