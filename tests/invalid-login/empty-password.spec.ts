// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Invalid Login Credentials Tests', () => {
  test('Submit with empty password field', async ({ page }) => {
    // Navigate to https://app.vwo.com/#/login
    await page.goto('https://app.vwo.com/#/login');

    // Enter 'test@example.com' in the Email address field
    await page.getByRole('textbox', { name: 'Email address' }).fill('test@example.com');

    // Leave the Password field empty and click the 'Sign in' button
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    // Verify the error message is visible
    await expect(page.getByText('Your email, password, IP address or location did not match')).toBeVisible();
  });
});
