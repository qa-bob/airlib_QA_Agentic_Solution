/**
 * Contact form test data fixtures.
 * Used across functional and regression tests.
 */

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const validContactData: ContactFormData = {
  name: 'QA Test User',
  email: 'qa-test@example.com',
  message: 'This is an automated QA test message. Please disregard.',
};

export const invalidEmailData: ContactFormData = {
  name: 'Test User',
  email: 'not-a-valid-email',
  message: 'Testing invalid email validation.',
};

export const emptyNameData: ContactFormData = {
  name: '',
  email: 'valid@example.com',
  message: 'Testing empty name validation.',
};

export const longMessageData: ContactFormData = {
  name: 'Long Message Tester',
  email: 'long-message@example.com',
  message: 'A'.repeat(500),
};

export const specialCharData: ContactFormData = {
  name: "O'Brien & Associates <test>",
  email: 'special+chars@example.co.uk',
  message: 'Testing special characters: <script>alert("xss")</script> & "quoted" text.',
};
