// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Invalid Login Credentials Tests', () => {
  test('Verify form state after error message', async ({ page }) => {
    // Navigate to https://app.vwo.com/#/login and submit invalid credentials
    await page.goto('https://app.vwo.com/#/login');

    const emailField = page.getByRole('textbox', { name: 'Email address' });
    const passwordField = page.getByRole('textbox', { name: 'Password' });
    const signInButton = page.getByRole('button', { name: 'Sign in', exact: true });

    // Enter invalid credentials
    await emailField.fill('invalid@test.com');
    await passwordField.fill('wrongpass123');
    await signInButton.click();

    // Verify the error message appears
    const errorMessage = page.getByText('Your email, password, IP address or location did not match');
    await expect(errorMessage).toBeVisible();

    // Verify form state after error
    // The error message persists until the page is refreshed
    await expect(errorMessage).toBeVisible();
    
    // The Sign in button should be enabled and ready for another attempt
    await expect(signInButton).toBeEnabled();
    
    // The form fields may retain the entered values (based on application design)
    // This test verifies the field values are still present after error
    await expect(emailField).toHaveValue('invalid@test.com');
    await expect(passwordField).toHaveValue('wrongpass123');
  });
});
