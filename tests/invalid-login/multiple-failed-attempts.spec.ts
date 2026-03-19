// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Invalid Login Credentials Tests', () => {
  test('Test multiple consecutive failed login attempts', async ({ page }) => {
    // Navigate to https://app.vwo.com/#/login
    await page.goto('https://app.vwo.com/#/login');

    // First attempt with invalid credentials
    await page.getByRole('textbox', { name: 'Email address' }).fill('test1@invalid.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrong1');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    // Verify error message appears for first attempt
    await expect(page.getByText('Your email, password, IP address or location did not match')).toBeVisible();

    // Second attempt with different invalid credentials
    await page.getByRole('textbox', { name: 'Email address' }).fill('test2@invalid.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrong2');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    // Verify error message appears for second attempt
    await expect(page.getByText('Your email, password, IP address or location did not match')).toBeVisible();

    // Third attempt with another set of invalid credentials
    await page.getByRole('textbox', { name: 'Email address' }).fill('test3@invalid.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrong3');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    // Verify error message appears for third attempt
    await expect(page.getByText('Your email, password, IP address or location did not match')).toBeVisible();
    
    // Verify the form continues to be functional
    await expect(page.getByRole('button', { name: 'Sign in', exact: true })).toBeEnabled();
  });
});
