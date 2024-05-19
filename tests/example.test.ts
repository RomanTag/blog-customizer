// tests/example.test.ts
import { test, expect } from '@playwright/test';

test('simple test', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toBe('Example Domain');
});
