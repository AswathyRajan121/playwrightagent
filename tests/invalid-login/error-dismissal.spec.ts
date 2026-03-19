// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Invalid Login Credentials Tests', () => {
  test('Test error message dismissal', async ({ page }) => {
    // Navigate to https://app.vwo.com/#/login and submit invalid credentials
    await page.goto('https://app.vwo.com/#/login');

    // Enter invalid email 'invalid@test.com' in the Email address field
    await page.getByRole('textbox', { name: 'Email address' }).fill('invalid@test.com');

    // Enter invalid password 'wrongpass' in the Password field
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpass');

    // Click the Sign in button
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    // Verify the error message is visible after submission
    await expect(page.getByText('Your email, password, IP address or location did not match')).toBeVisible();

    // Refresh the page by pressing F5
    await page.keyboard.press('F5');

    // Verify the error message behavior after refresh
    await expect(page.getByText('Your email, password, IP address or location did not match')).toBeVisible();
  });
});
