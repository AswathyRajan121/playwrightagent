import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * Playwright Configuration with Advanced Reporting
 * Supports:
 * - HTML Report (default)
 * - Allure Report (alternative)
 * - Screenshots on failure
 * - Video recording
 * - Trace files
 * - Custom JUnit XML
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Timeout settings */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Multiple reporters for comprehensive coverage */
  reporter: [
    ['html', { open: 'never', outputFolder: 'reports/html' }],
    ['json', { outputFile: 'reports/json/results.json' }],
    ['junit', { outputFile: 'reports/junit/results.xml' }],
    ['list'],
    ...(process.env.CI ? [['github']] : []),
  ],

  /* Global configuration for all tests */
  use: {
    /* Base URL for your application */
    baseURL: process.env.BASE_URL || 'https://app.vwo.com',
    
    /* Screenshot settings */
    screenshot: {
      mode: 'only-on-failure',
      dir: 'reports/screenshots',
    },
    
    /* Video recording */
    video: {
      mode: 'retain-on-failure',
      dir: 'reports/videos',
    },
    
    /* Trace files for debugging */
    trace: 'on-first-retry',
    
    /* Network request logging */
    recordHar: {
      omitContent: true,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Add custom context options
        bypassCSP: true,
      },
    },

    // Uncomment for Firefox testing
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // Uncomment for Safari testing
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Global setup and teardown */
  // globalSetup: path.resolve('./tests/setup/globalSetup.ts'),
  // globalTeardown: path.resolve('./tests/setup/globalTeardown.ts'),

  /* Web server configuration (if needed) */
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
