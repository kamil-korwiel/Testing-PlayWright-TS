import { test, expect } from '@playwright/test';


// Use test and expect as usual
test("basic test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(page).toHaveTitle("Vite + React + TS");
});
