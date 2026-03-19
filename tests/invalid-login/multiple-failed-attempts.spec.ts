// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Invalid Login Credentials Tests', () => {
  test('Test multiple consecutive failed login attempts', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.goto();

    // First attempt with invalid credentials
    await loginPage.submitLogin('test1@invalid.com', 'wrong1');
    await loginPage.verifyErrorMessageVisible();

    // Second attempt with different invalid credentials
    await loginPage.submitLogin('test2@invalid.com', 'wrong2');
    await loginPage.verifyErrorMessageVisible();

    // Third attempt with another set of invalid credentials
    await loginPage.submitLogin('test3@invalid.com', 'wrong3');
    await loginPage.verifyErrorMessageVisible();
    
    // Verify the form continues to be functional
    await loginPage.verifySignInButtonEnabled();
  });
});
