// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Invalid Login Credentials Tests', () => {
  test('Submit credentials with invalid email format', async ({ page }) => {
    // Navigate to https://app.vwo.com/#/login
    await page.goto('https://app.vwo.com/#/login');

    // Enter 'notanemail' (without @ symbol) in the Email address field
    await page.getByRole('textbox', { name: 'Email address' }).fill('notanemail');

    // Enter 'testpassword123' in the Password field
    await page.getByRole('textbox', { name: 'Password' }).fill('testpassword123');

    // Click the 'Sign in' button
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    // Verify the error message is visible
    await expect(page.getByText('Your email, password, IP address or location did not match')).toBeVisible();
  });
});
