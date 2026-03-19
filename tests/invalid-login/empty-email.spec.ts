// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Invalid Login Credentials Tests', () => {
  test('Submit with empty email field', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.goto();

    // Submit with empty email field (password only)
    await loginPage.submitLoginWithPasswordOnly('anypassword123');

    // Verify the error message is visible
    await loginPage.verifyErrorMessageVisible();
  });
});
