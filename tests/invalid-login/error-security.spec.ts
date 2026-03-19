// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Invalid Login Credentials Tests', () => {
  test('Verify error message security and information disclosure', async ({ page }) => {
    // Navigate to https://app.vwo.com/#/login
    await page.goto('https://app.vwo.com/#/login');

    // Submit invalid email with invalid password
    await page.getByRole('textbox', { name: 'Email address' }).fill('nosuchuser@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    // Verify the error message is generic and does not disclose whether email exists
    const errorMessage = page.getByText('Your email, password, IP address or location did not match');
    await expect(errorMessage).toBeVisible();
    
    // Verify no specific information about email existence or password validity
    await expect(page.getByText(/email not found|invalid email/i)).not.toBeVisible();
    await expect(page.getByText(/incorrect password|wrong password/i)).not.toBeVisible();
  });
});
