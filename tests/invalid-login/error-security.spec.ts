// spec: specs/vwo-login-test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Invalid Login Credentials Tests', () => {
  test('Verify error message security and information disclosure', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page and submit invalid credentials
    await loginPage.goto();
    await loginPage.submitLogin('nosuchuser@example.com', 'wrongpassword');

    // Verify the error message is generic and does not disclose account enumeration
    await loginPage.verifyErrorMessageVisible();
    
    // The error message should indicate authentication failure without disclosing
    // whether the email exists or if only the password is wrong
    const errorText = await loginPage.errorMessage.textContent();
    expect(errorText).toContain('Your email, password, IP address or location did not match');
  });
});
