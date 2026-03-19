// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Invalid Login Credentials Tests', () => {
  test('Test Remember me checkbox functionality', async ({ page }) => {
    // Navigate to https://app.vwo.com/#/login
    await page.goto('https://app.vwo.com/#/login');

    // Get the Remember me label/wrapper that is clickable
    // The actual checkbox input is hidden, so we click the visible wrapper
    const rememberMeLabel = page.locator('text=Remember me').locator('..');
    
    // Verify the Remember me element is visible
    await expect(rememberMeLabel).toBeVisible();

    // Click the Remember me element to toggle the checkbox
    await rememberMeLabel.click();
    
    // Verify the checkbox is now checked by looking for the hidden input
    const hiddenCheckbox = page.locator('#checkbox-remember');
    await expect(hiddenCheckbox).toBeChecked();

    // Click again to uncheck
    await rememberMeLabel.click();
    
    // Verify the checkbox is unchecked
    await expect(hiddenCheckbox).not.toBeChecked();
  });
});
