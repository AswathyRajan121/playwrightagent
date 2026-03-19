// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Invalid Login Credentials Tests', () => {
  test('Test error message dismissal', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page and submit invalid credentials
    await loginPage.goto();
    await loginPage.submitLogin('invalid@test.com', 'wrongpass');

    // Verify the error message is visible after submission
    await loginPage.verifyErrorMessageVisible();

    // Refresh the page
    await loginPage.refreshPage();

    // Verify the error message behavior after refresh
    await loginPage.verifyErrorMessageVisible();
  });
});
