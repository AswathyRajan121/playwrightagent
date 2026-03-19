// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Invalid Login Credentials Tests', () => {
  test('Test password visibility toggle with invalid credentials', async ({ page }) => {
    // Navigate to https://app.vwo.com/#/login
    await page.goto('https://app.vwo.com/#/login');

    const passwordField = page.getByRole('textbox', { name: 'Password' });
    const toggleButton = page.getByRole('button', { name: 'Toggle password visibility' });

    // Enter an invalid password
    await passwordField.fill('myinvalidpassword123');

    // Verify password is masked (type is password)
    await expect(passwordField).toHaveAttribute('type', 'password');

    // Click the toggle button to show password
    await toggleButton.click();

    // Verify password is visible (type is text)
    await expect(passwordField).toHaveAttribute('type', 'text');
    await expect(passwordField).toHaveValue('myinvalidpassword123');

    // Click the toggle button again to hide password
    await toggleButton.click();

    // Verify password is masked again
    await expect(passwordField).toHaveAttribute('type', 'password');

    // Enter email and submit with invalid credentials
    await page.getByRole('textbox', { name: 'Email address' }).fill('test@example.com');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    // Verify the error message appears
    await expect(page.getByText('Your email, password, IP address or location did not match')).toBeVisible();
  });
});
