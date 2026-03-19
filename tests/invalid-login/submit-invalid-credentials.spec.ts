// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Invalid Login Credentials Tests', () => {
  test('Submit invalid email and password credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.goto();

    // Submit invalid credentials
    await loginPage.submitLogin('invalidemail@test.com', 'invalidpassword123');

    // Verify the error message is visible
    await loginPage.verifyErrorMessageVisible();
  });
});
