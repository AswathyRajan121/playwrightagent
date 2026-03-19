import { TestInfo, Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * Reporting utility class for test reporting
 * Handles screenshots, logs, and metadata attachment
 */
export class ReportingUtility {
  private page: Page;
  private testInfo: TestInfo;
  private logs: Array<{ timestamp: string; level: string; message: string }> = [];

  constructor(page: Page, testInfo: TestInfo) {
    this.page = page;
    this.testInfo = testInfo;
  }

  /**
   * Capture a screenshot and attach it to the report
   * @param screenshotName - Optional custom name for the screenshot
   * @returns Path to the saved screenshot
   */
  async captureScreenshot(screenshotName?: string): Promise<string> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const name = screenshotName || `screenshot-${timestamp}`;
      const outputPath = this.testInfo.outputPath();
      const screenshotPath = path.join(outputPath, `${name}.png`);

      // Ensure directory exists
      const dir = path.dirname(screenshotPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Capture the screenshot
      await this.page.screenshot({ path: screenshotPath, fullPage: true });

      // Attach to report
      await this.testInfo.attach(name, {
        path: screenshotPath,
        contentType: 'image/png',
      });

      this.log(`Screenshot captured: ${screenshotName || 'full page'}`);
      return screenshotPath;
    } catch (error) {
      this.log(`Failed to capture screenshot: ${error}`, 'ERROR');
      throw error;
    }
  }

  /**
   * Capture a screenshot of a specific element
   * @param elementSelector - CSS selector of the element
   * @param screenshotName - Optional name for the screenshot
   */
  async captureElementScreenshot(elementSelector: string, screenshotName?: string): Promise<string> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const name = screenshotName || `element-${timestamp}`;
      const outputPath = this.testInfo.outputPath();
      const screenshotPath = path.join(outputPath, `${name}.png`);

      // Ensure directory exists
      const dir = path.dirname(screenshotPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Locate and screenshot the element
      const element = this.page.locator(elementSelector);
      await element.waitFor({ state: 'visible', timeout: 5000 });
      await element.screenshot({ path: screenshotPath });

      // Attach to report
      await this.testInfo.attach(name, {
        path: screenshotPath,
        contentType: 'image/png',
      });

      this.log(`Element screenshot captured: ${screenshotName || elementSelector}`);
      return screenshotPath;
    } catch (error) {
      this.log(`Failed to capture element screenshot: ${error}`, 'ERROR');
      throw error;
    }
  }

  /**
   * Log a message and add it to the report
   * @param message - Log message
   * @param level - Log level (INFO, WARN, ERROR)
   */
  log(message: string, level: 'INFO' | 'WARN' | 'ERROR' = 'INFO'): void {
    const timestamp = new Date().toISOString();
    this.logs.push({ timestamp, level, message });
    console.log(`[${timestamp}] [${level}] ${message}`);
  }

  /**
   * Capture page content and attach to report
   * @param contentName - Name for the content attachment
   */
  async capturePageContent(contentName?: string): Promise<void> {
    try {
      const name = contentName || 'page-content';
      const html = await this.page.content();

      await this.testInfo.attach(name, {
        body: html,
        contentType: 'text/html',
      });

      this.log(`Page content captured: ${name}`);
    } catch (error) {
      this.log(`Failed to capture page content: ${error}`, 'ERROR');
    }
  }

  /**
   * Capture network HAR and attach to report
   * @param harName - Name for the HAR attachment
   */
  async captureNetworkTrace(harName?: string): Promise<void> {
    try {
      const name = harName || 'network-trace';
      // This is typically handled by Playwright config
      this.log(`Network trace configured: ${name}`);
    } catch (error) {
      this.log(`Failed to capture network trace: ${error}`, 'ERROR');
    }
  }

  /**
   * Attach test metadata to report
   * @param testMetadata - Metadata object
   */
  async attachTestMetadata(testMetadata: Record<string, any>): Promise<void> {
    try {
      const jsonContent = JSON.stringify(testMetadata, null, 2);

      await this.testInfo.attach('test-metadata', {
        body: jsonContent,
        contentType: 'application/json',
      });

      this.log(`Test metadata attached`);
    } catch (error) {
      this.log(`Failed to attach test metadata: ${error}`, 'ERROR');
    }
  }

  /**
   * Attach performance metrics to report
   * @param metrics - Performance metrics object
   */
  async attachPerformanceMetrics(metrics: {
    startTime?: number;
    endTime?: number;
    duration?: number;
    navigationTiming?: any;
  }): Promise<void> {
    try {
      const jsonContent = JSON.stringify(metrics, null, 2);

      await this.testInfo.attach('performance-metrics', {
        body: jsonContent,
        contentType: 'application/json',
      });

      this.log(`Performance metrics attached`);
    } catch (error) {
      this.log(`Failed to attach performance metrics: ${error}`, 'ERROR');
    }
  }

  /**
   * Finalize and export logs
   */
  async finalizeLogs(): Promise<void> {
    if (this.logs.length > 0) {
      const logContent = this.logs
        .map((log) => `[${log.timestamp}] [${log.level}] ${log.message}`)
        .join('\n');

      await this.testInfo.attach('execution-logs', {
        body: logContent,
        contentType: 'text/plain',
      });
    }
  }

  /**
   * Get all captured logs
   */
  getLogs(): Array<{ timestamp: string; level: string; message: string }> {
    return this.logs;
  }

  /**
   * Clear logs
   */
  clearLogs(): void {
    this.logs = [];
  }
}
