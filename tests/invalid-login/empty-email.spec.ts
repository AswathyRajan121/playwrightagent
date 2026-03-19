// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Invalid Login Credentials Tests', () => {
  test('Submit with empty email field', async ({ page }) => {
    // Navigate to https://app.vwo.com/#/login
    await page.goto('https://app.vwo.com/#/login');

    // Leave the Email address field empty and enter 'anypassword123' in the Password field
    await page.getByRole('textbox', { name: 'Password' }).fill('anypassword123');

    // Click the 'Sign in' button
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    // Verify the error message is visible
    await expect(page.getByText('Your email, password, IP address or location did not match')).toBeVisible();
  });
});
