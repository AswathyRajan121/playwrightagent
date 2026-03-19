// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Invalid Login Credentials Tests', () => {
  test('Test Remember me checkbox functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.goto();

    // Verify the Remember me checkbox is unchecked initially
    await loginPage.verifyRememberMeIsNotChecked();

    // Click the Remember me checkbox to check it
    await loginPage.clickRememberMe();
    
    // Verify the checkbox is now checked
    await loginPage.verifyRememberMeIsChecked();

    // Click again to uncheck
    await loginPage.clickRememberMe();
    
    // Verify the checkbox is unchecked
    await loginPage.verifyRememberMeIsNotChecked();
  });
});
