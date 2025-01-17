// @ts-check
import { test, expect } from '@playwright/test';
import MCR from "monocart-coverage-reports";

test('has title', async ({ page }) => {
  
  await Promise.all([
      page.coverage.startJSCoverage({
          resetOnNavigation: false
      }),
      page.coverage.startCSSCoverage({
          resetOnNavigation: false
      })
  ]);

  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);

  const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage()
  ]);

  const coverageData = [... jsCoverage, ... cssCoverage];

  const mcr = MCR({
      name: 'My Coverage Report - 2024-02-28',
      outputDir: './coverage-reports',
      reports: ["v8", "console-details"],
      cleanCache: true
  });
  await mcr.add(coverageData);
  await mcr.generate();
  
});