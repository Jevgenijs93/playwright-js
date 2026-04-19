const { test, expect } = require('@playwright/test');

test('BUG-07 / P2: guests should not be offered protected actions as directly available', async ({ page }) => {
  // Step 1: Open the home page as a guest (not logged in)
  await page.goto('/');

  // Step 2: Check that "Add post" link is NOT visible for guests
  await expect(page.getByRole('link', { name: /add post/i })).toHaveCount(0);

  // Step 3: Check that "Plans & Pricing" link is NOT visible for guests
  await expect(page.getByRole('link', { name: /plans & pricing/i })).toHaveCount(0);
});