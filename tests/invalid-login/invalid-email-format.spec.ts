// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Invalid Login Credentials Tests', () => {
  test('Submit credentials with invalid email format', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.goto();

    // Submit with invalid email format (without @ symbol)
    await loginPage.submitLogin('notanemail', 'testpassword123');

    // Verify the error message is visible
    await loginPage.verifyErrorMessageVisible();
  });
});
