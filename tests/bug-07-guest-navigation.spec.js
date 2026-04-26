const { test, expect } = require('@playwright/test');
test('BUG-07 / P2: guests should not be offered protected actions as directly available', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: /add post/i })).toHaveCount(0);

  await expect(page.getByRole('link', { name: /plans & pricing/i })).toHaveCount(0);
});