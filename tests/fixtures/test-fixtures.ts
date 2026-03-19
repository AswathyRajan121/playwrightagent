import { test as base, expect, Page, TestInfo } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { LoginPage } from '../pages/LoginPage';

/**
 * Extended test fixture with reporting utilities
 */
export const test = base.extend<{
  loginPage: LoginPage;
  captureScreenshot: (name?: string) => Promise<string>;
  attachLog: (message: string, level?: 'INFO' | 'WARN' | 'ERROR') => void;
  getTestMetadata: () => TestMetadata;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  captureScreenshot: async ({ page }, use, testInfo) => {
    const screenshotFunction = async (name?: string): Promise<string> => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const screenshotName = name || `screenshot-${timestamp}`;
      const screenshotPath = path.join(testInfo.outputPath(), `${screenshotName}.png`);
      
      // Ensure directory exists
      const dir = path.dirname(screenshotPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      await page.screenshot({ path: screenshotPath, fullPage: true });
      await testInfo.attach(screenshotName, {
        path: screenshotPath,
        contentType: 'image/png',
      });

      return screenshotPath;
    };

    await use(screenshotFunction);
  },

  attachLog: async ({}, use, testInfo) => {
    const logs: Array<{ timestamp: string; level: string; message: string }> = [];

    const attachLogFunction = (message: string, level: 'INFO' | 'WARN' | 'ERROR' = 'INFO') => {
      const timestamp = new Date().toISOString();
      logs.push({ timestamp, level, message });
      console.log(`[${timestamp}] [${level}] ${message}`);
    };

    await use(attachLogFunction);

    // Attach logs to report
    if (logs.length > 0) {
      const logContent = logs
        .map((log) => `[${log.timestamp}] [${log.level}] ${log.message}`)
        .join('\n');

      await testInfo.attach('test-logs', {
        body: logContent,
        contentType: 'text/plain',
      });
    }
  },

  getTestMetadata: async ({}, use, testInfo) => {
    const metadata: TestMetadata = {
      testName: testInfo.title,
      testFile: testInfo.file,
      testLine: testInfo.line,
      startTime: new Date().toISOString(),
      browser: testInfo.project?.name || 'unknown',
      env: {
        NODE_ENV: process.env.NODE_ENV || 'test',
        BASE_URL: process.env.BASE_URL || 'https://app.vwo.com',
        CI: process.env.CI === 'true' ? 'true' : 'false',
      },
    };

    await use(() => metadata);
  },
});

export interface TestMetadata {
  testName: string;
  testFile: string;
  testLine: number;
  startTime: string;
  browser: string;
  env: {
    NODE_ENV: string;
    BASE_URL: string;
    CI: string;
  };
}

export { expect };
