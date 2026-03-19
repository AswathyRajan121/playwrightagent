// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Invalid Login Credentials Tests', () => {
  test('Submit invalid email and password credentials', async ({ page }) => {
    // Navigate to https://app.vwo.com/#/login
    await page.goto('https://app.vwo.com/#/login');

    // Enter 'invalidemail@test.com' in the Email address field
    await page.getByRole('textbox', { name: 'Email address' }).fill('invalidemail@test.com');

    // Enter 'invalidpassword123' in the Password field
    await page.getByRole('textbox', { name: 'Password' }).fill('invalidpassword123');

    // Click the 'Sign in' button
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    // Verify the error message is visible: 'Your email, password, IP address or location did not match'
    await expect(page.getByText('Your email, password, IP address or location did not match')).toBeVisible();
  });
});
