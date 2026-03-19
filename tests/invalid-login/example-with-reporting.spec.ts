import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ReportingUtility } from '../utils/reporting-utility';
import { test } from '../fixtures/test-fixtures';

/**
 * Example test suite demonstrating HTML reporting integration
 * Shows best practices for test organization with detailed reporting
 */
test.describe('VWO Login - Reporting Example', () => {
  let reporting: ReportingUtility;

  test.beforeEach(async ({ page, captureScreenshot }, testInfo) => {
    // Initialize reporting utility
    reporting = new ReportingUtility(page, testInfo);
    reporting.log('Test started', 'INFO');
    
    // Attach test metadata
    await reporting.attachTestMetadata({
      testName: testInfo.title,
      browser: testInfo.project?.name,
      timestamp: new Date().toISOString(),
      environment: 'VWO Login Page',
    });
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Finalize logs
    await reporting.finalizeLogs();
    
    // Capture screenshot on failure
    if (testInfo.status !== 'passed') {
      reporting.log(`Test failed or skipped. Status: ${testInfo.status}`, 'WARN');
      await reporting.captureScreenshot(`failure-${testInfo.title}`);
    } else {
      reporting.log('Test completed successfully', 'INFO');
    }
  });

  test('Submit invalid credentials - with reporting', async ({ page, loginPage, getTestMetadata }) => {
    const metadata = getTestMetadata();
    reporting.log(`Running test on: ${metadata.browser}`, 'INFO');

    try {
      // Navigate to login page
      reporting.log('Navigating to VWO login page', 'INFO');
      await loginPage.goto();
      await reporting.captureScreenshot('01-initial-page-load');

      // Fill credentials
      reporting.log('Entering invalid email: invalidemail@test.com', 'INFO');
      await loginPage.fillEmail('invalidemail@test.com');
      
      reporting.log('Entering invalid password', 'INFO');
      await loginPage.fillPassword('invalidpassword123');
      
      await reporting.captureScreenshot('02-credentials-entered');

      // Submit form
      reporting.log('Clicking Sign in button', 'INFO');
      await loginPage.clickSignIn();

      // Wait for error message
      reporting.log('Waiting for error message', 'INFO');
      await reporting.captureScreenshot('03-after-submission');

      // Verify error message
      reporting.log('Verifying error message is visible', 'INFO');
      await loginPage.verifyErrorMessageVisible();

      reporting.log('Error message verified successfully', 'INFO');
      await reporting.captureScreenshot('04-error-message-visible');

      // Attach page content for debugging
      await reporting.capturePageContent('page-content-final');

    } catch (error) {
      reporting.log(`Test error: ${error}`, 'ERROR');
      throw error;
    }
  });

  test('Test Remember me checkbox - with reporting', async ({ page, loginPage }) => {
    try {
      reporting.log('Navigating to login page', 'INFO');
      await loginPage.goto();

      reporting.log('Verifying Remember me checkbox is unchecked', 'INFO');
      await loginPage.verifyRememberMeIsNotChecked();

      reporting.log('Clicking Remember me checkbox', 'INFO');
      await loginPage.clickRememberMe();
      await reporting.captureScreenshot('remember-me-checked');

      reporting.log('Verifying Remember me checkbox is checked', 'INFO');
      await loginPage.verifyRememberMeIsChecked();

      reporting.log('Unchecking Remember me checkbox', 'INFO');
      await loginPage.clickRememberMe();

      reporting.log('Verifying Remember me checkbox is unchecked', 'INFO');
      await loginPage.verifyRememberMeIsNotChecked();

      reporting.log('Remember me checkbox test passed', 'INFO');

    } catch (error) {
      reporting.log(`Test error: ${error}`, 'ERROR');
      throw error;
    }
  });

  test('Test password visibility toggle - with reporting', async ({ page, loginPage }) => {
    try {
      reporting.log('Navigating to login page', 'INFO');
      await loginPage.goto();

      reporting.log('Entering password in field', 'INFO');
      await loginPage.fillPassword('testpassword123');

      reporting.log('Verifying password is initially masked', 'INFO');
      await loginPage.verifyPasswordIsMasked();
      await reporting.captureScreenshot('password-masked');

      reporting.log('Toggling password visibility', 'INFO');
      await loginPage.togglePasswordVisibility();

      reporting.log('Verifying password is now visible', 'INFO');
      await loginPage.verifyPasswordIsVisible();
      await reporting.captureScreenshot('password-visible');

      reporting.log('Password visibility test passed', 'INFO');

    } catch (error) {
      reporting.log(`Test error: ${error}`, 'ERROR');
      throw error;
    }
  });

  test('Test error on empty fields - with reporting', async ({ page, loginPage }) => {
    try {
      reporting.log('Navigating to login page', 'INFO');
      await loginPage.goto();
      await reporting.captureScreenshot('empty-login-form');

      reporting.log('Attempting to submit with empty fields', 'INFO');
      await loginPage.submitLoginWithEmptyFields();

      reporting.log('Waiting for error message', 'INFO');
      await reporting.captureScreenshot('error-on-empty-fields');

      reporting.log('Verifying error message is displayed', 'INFO');
      await loginPage.verifyErrorMessageVisible();

      reporting.log('Empty fields error test passed', 'INFO');

    } catch (error) {
      reporting.log(`Test error: ${error}`, 'ERROR');
      throw error;
    }
  });
});
