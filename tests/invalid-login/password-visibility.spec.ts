// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Invalid Login Credentials Tests', () => {
  test('Test password visibility toggle with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.goto();

    // Enter an invalid password
    await loginPage.fillPassword('myinvalidpassword123');

    // Verify password is masked
    await loginPage.verifyPasswordIsMasked();

    // Click the toggle button to show password
    await loginPage.togglePasswordVisibility();

    // Verify password is visible
    await loginPage.verifyPasswordIsVisible();

    // Click the toggle button again to hide password
    await loginPage.togglePasswordVisibility();

    // Verify password is masked again
    await loginPage.verifyPasswordIsMasked();

    // Enter email and submit with invalid credentials
    await loginPage.fillEmail('test@example.com');
    await loginPage.clickSignIn();

    // Verify the error message appears
    await loginPage.verifyErrorMessageVisible();
  });
});
