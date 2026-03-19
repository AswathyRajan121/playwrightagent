# Reporting System - Quick Reference Guide

## 🎯 At a Glance

| Feature | Command | Output |
|---------|---------|--------|
| Run all tests | `npm run test` | Terminal output |
| Run & view report | `npm run test:report` | HTML report auto-opens |
| Run in UI mode | `npm run test:ui` | Interactive Playwright inspector |
| Run in debug mode | `npm run test:debug` | Debugger breakpoints enabled |
| Open last report | `npm run report:open` | Opens `reports/html/index.html` |
| Clean reports | `npm run report:clean` | Deletes all reports |
| CI/CD mode | `npm run test:ci` | All reporters enabled |

---

## 📝 Adding Reporting to Your Test

### Option 1: Minimal (Use built-in fixtures)

```typescript
import { test } from '../fixtures/test-fixtures';

test('my test', async ({ loginPage, attachLog, captureScreenshot }) => {
  attachLog('Test started');
  
  await loginPage.goto();
  await captureScreenshot('after-navigation');
  
  attachLog('Test completed');
});
```

### Option 2: Standard (Import ReportingUtility)

```typescript
import { test } from '../fixtures/test-fixtures';
import { ReportingUtility } from '../utils/reporting-utility';

test('my test', async ({ page }, testInfo) => {
  const reporting = new ReportingUtility(page, testInfo);
  
  reporting.log('Starting', 'INFO');
  await reporting.captureScreenshot('step1');
  await reporting.finalizeLogs();
});
```

### Option 3: Advanced (With hooks and metadata)

```typescript
import { test } from '../fixtures/test-fixtures';
import { ReportingUtility } from '../utils/reporting-utility';

test.describe('My Feature', () => {
  let reporting: ReportingUtility;

  test.beforeEach(async ({ page }, testInfo) => {
    reporting = new ReportingUtility(page, testInfo);
    reporting.log(`Starting: ${testInfo.title}`, 'INFO');
  });

  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== 'passed') {
      reporting.log(`FAILED: ${testInfo.status}`, 'ERROR');
    }
    await reporting.finalizeLogs();
  });

  test('scenario', async ({ loginPage }) => {
    await loginPage.goto();
    await reporting.captureScreenshot('loaded');
    reporting.log('Verification passed', 'INFO');
  });
});
```

---

## 🔧 Common Tasks

### Capture a screenshot
```typescript
// Full page screenshot
await reporting.captureScreenshot('my-screenshot');

// Specific element screenshot
await reporting.captureElementScreenshot('[name="email"]', 'email-field');

// Built-in fixture
await captureScreenshot('my-screenshot');
```

### Log messages
```typescript
// Basic logging
reporting.log('Message here', 'INFO');

// With levels
reporting.log('Warning message', 'WARN');
reporting.log('Error occurred', 'ERROR');

// Built-in fixture
attachLog('Message here');
```

### Attach metadata
```typescript
// Test metadata
await reporting.attachTestMetadata({
  testId: 'TC-001',
  priority: 'HIGH',
  component: 'login'
});

// Performance metrics
await reporting.attachPerformanceMetrics({
  pageLoadTime: 1250,
  interactionTime: 300,
  assertions: 5
});
```

### Capture page content
```typescript
// Full page HTML
await reporting.capturePageContent('page-html');

// Network trace
await reporting.captureNetworkTrace('network-trace');
```

---

## 📊 What Gets Captured Automatically

| Item | When | Where |
|------|------|-------|
| Screenshots | On failure + manual | `reports/screenshots/` |
| Videos | On failure | `reports/videos/` |
| Traces | On retry | `reports/traces/` |
| Logs | Always | HTML report |
| Metadata | Attached | HTML report |

---

## 🎬 Report Files Generated

- **HTML Report**: `reports/html/index.html` ← Start here!
- **JSON Report**: `reports/json/results.json`
- **JUnit Report**: `reports/junit/results.xml` ← For CI/CD
- **Screenshots**: `reports/screenshots/` ← Failure screenshots
- **Videos**: `reports/videos/` ← Failure videos

---

## 🚀 Migrating Existing Tests

To add reporting to your existing test:

```diff
  import { test } from '@playwright/test';
  import { LoginPage } from '../pages/LoginPage';
  
  test('login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
+   const reporting = new ReportingUtility(page, testInfo);
    
    await loginPage.goto();
+   reporting.log('Navigated to login', 'INFO');
+   await reporting.captureScreenshot('after-navigation');
    
    await loginPage.fillEmail('invalid@test.com');
    await loginPage.fillPassword('wrong-password');
    await loginPage.clickSignIn();
    
+   await reporting.captureScreenshot('after-submit');
    await expect(page.locator('.error')).toBeVisible();
+   reporting.log('Error message verified', 'INFO');
+   await reporting.finalizeLogs();
  });
```

---

## 🔍 Debugging a Failed Test

1. **Check HTML Report**: `npm run report:open`
2. **View Screenshots**: Locate failure screenshot in report
3. **Watch Video**: Click play button to see test execution
4. **Read Logs**: Check log messages before failure
5. **Use Debug Mode**: `npm run test:debug` to step through
6. **Check Traces**: Advanced debugging with trace viewer

---

## 🐛 Common Issues

**Q: Report not opening?**
A: Run `npm run report:open` directly

**Q: Screenshots missing?**
A: Make sure `screenshot: 'only-on-failure'` is in `playwright.config.ts`

**Q: Too many screenshots?**
A: Manually call `captureScreenshot()` only when needed, rely on auto-failure capture

**Q: Logs not showing?**
A: Call `await reporting.finalizeLogs()` at test end

**Q: Test timed out?**
A: Increase timeout in `playwright.config.ts` under `timeout: X`

---

## 📋 Reporting Fixture API

```typescript
// Available in test
attachLog(message: string): void
captureScreenshot(name?: string): Promise<string>
getTestMetadata(): TestMetadata
```

---

## 🎯 Next Steps

1. ✅ Run tests: `npm run test`
2. ✅ View report: `npm run report:open`
3. ✅ Migrate tests: Add reporting to existing test files
4. ✅ Configure CI/CD: Set up pipeline with JUnit reporter
5. ✅ Archive reports: Set retention policy for old reports

---

**Tip**: Start with Option 1 (minimal approach) and upgrade to Option 3 (advanced) as you need more detailed reporting.
