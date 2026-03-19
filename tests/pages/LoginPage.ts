import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;
  readonly forgotPasswordButton: Locator;
  readonly rememberMeLabel: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly togglePasswordVisibilityButton: Locator;
  readonly errorMessage: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.getByRole('textbox', { name: 'Email address' });
    this.passwordField = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign in', exact: true });
    this.forgotPasswordButton = page.getByRole('button', { name: 'Forgot Password?' });
    this.rememberMeLabel = page.locator('text=Remember me').locator('..');
    this.rememberMeCheckbox = page.locator('#checkbox-remember');
    this.togglePasswordVisibilityButton = page.getByRole('button', { name: 'Toggle password visibility' });
    this.errorMessage = page.getByText('Your email, password, IP address or location did not match');
  }

  /**
   * Navigate to the VWO login page
   */
  async goto() {
    await this.page.goto('https://app.vwo.com/#/login');
  }

  /**
   * Fill the email field with the provided email
   */
  async fillEmail(email: string) {
    await this.emailField.fill(email);
  }

  /**
   * Fill the password field with the provided password
   */
  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

  /**
   * Click the Sign in button
   */
  async clickSignIn() {
    await this.signInButton.click();
  }

  /**
   * Click the Forgot Password button
   */
  async clickForgotPassword() {
    await this.forgotPasswordButton.click();
  }

  /**
   * Click the Remember me checkbox
   */
  async clickRememberMe() {
    await this.rememberMeLabel.click();
  }

  /**
   * Click the password visibility toggle button
   */
  async togglePasswordVisibility() {
    await this.togglePasswordVisibilityButton.click();
  }

  /**
   * Submit login form with email and password
   */
  async submitLogin(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignIn();
  }

  /**
   * Submit login form with only email (password field left empty)
   */
  async submitLoginWithEmailOnly(email: string) {
    await this.fillEmail(email);
    await this.clickSignIn();
  }

  /**
   * Submit login form with only password (email field left empty)
   */
  async submitLoginWithPasswordOnly(password: string) {
    await this.fillPassword(password);
    await this.clickSignIn();
  }

  /**
   * Submit login form with both fields empty
   */
  async submitLoginWithEmptyFields() {
    await this.clickSignIn();
  }

  /**
   * Verify that the error message is visible
   */
  async verifyErrorMessageVisible() {
    await expect(this.errorMessage).toBeVisible();
  }

  /**
   * Verify that the error message is not visible
   */
  async verifyErrorMessageNotVisible() {
    await expect(this.errorMessage).not.toBeVisible();
  }

  /**
   * Get the email field value
   */
  async getEmailValue(): Promise<string | null> {
    return await this.emailField.inputValue();
  }

  /**
   * Get the password field value
   */
  async getPasswordValue(): Promise<string | null> {
    return await this.passwordField.inputValue();
  }

  /**
   * Get the password field type (password or text)
   */
  async getPasswordFieldType(): Promise<string | null> {
    return await this.passwordField.getAttribute('type');
  }

  /**
   * Verify that the email field is visible
   */
  async verifyEmailFieldVisible() {
    await expect(this.emailField).toBeVisible();
  }

  /**
   * Verify that the password field is visible
   */
  async verifyPasswordFieldVisible() {
    await expect(this.passwordField).toBeVisible();
  }

  /**
   * Verify that the sign in button is visible
   */
  async verifySignInButtonVisible() {
    await expect(this.signInButton).toBeVisible();
  }

  /**
   * Verify that the sign in button is enabled
   */
  async verifySignInButtonEnabled() {
    await expect(this.signInButton).toBeEnabled();
  }

  /**
   * Verify that the remember me checkbox is checked
   */
  async verifyRememberMeIsChecked() {
    await expect(this.rememberMeCheckbox).toBeChecked();
  }

  /**
   * Verify that the remember me checkbox is not checked
   */
  async verifyRememberMeIsNotChecked() {
    await expect(this.rememberMeCheckbox).not.toBeChecked();
  }

  /**
   * Verify password field is masked (type="password")
   */
  async verifyPasswordIsMasked() {
    await expect(this.passwordField).toHaveAttribute('type', 'password');
  }

  /**
   * Verify password field is visible (type="text")
   */
  async verifyPasswordIsVisible() {
    await expect(this.passwordField).toHaveAttribute('type', 'text');
  }

  /**
   * Refresh the page
   */
  async refreshPage() {
    await this.page.keyboard.press('F5');
  }

  /**
   * Clear the email field
   */
  async clearEmail() {
    await this.emailField.clear();
  }

  /**
   * Clear the password field
   */
  async clearPassword() {
    await this.passwordField.clear();
  }
}
