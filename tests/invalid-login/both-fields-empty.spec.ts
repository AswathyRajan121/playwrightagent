// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Invalid Login Credentials Tests', () => {
  test('Submit with both email and password empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.goto();

    // Submit with both fields empty
    await loginPage.submitLoginWithEmptyFields();

    // Verify the error message is visible
    await loginPage.verifyErrorMessageVisible();
  });
});
