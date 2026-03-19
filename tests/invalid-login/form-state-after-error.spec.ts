// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Invalid Login Credentials Tests', () => {
  test('Verify form state after error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page and submit invalid credentials
    await loginPage.goto();
    await loginPage.submitLogin('invalid@test.com', 'wrongpass123');

    // Verify the error message appears
    await loginPage.verifyErrorMessageVisible();

    // Verify the Sign in button is enabled and ready for another attempt
    await loginPage.verifySignInButtonEnabled();
    
    // Verify the email field retains the entered value
    await expect(loginPage.emailField).toHaveValue('invalid@test.com');
    
    // Note: The password field may be cleared for security reasons (not retained)
    // This is expected behavior for security-conscious applications
  });
});
