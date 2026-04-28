const { test, expect } = require('@playwright/test');

test('BUG-02: search by "test1" must show test11 и test12', async ({ page }) => {

  await page.goto('http://localhost:3000/posts');

  const searchInput = page.getByLabel('Search');

  await searchInput.fill('test1');

  await page.getByRole('button', { name: 'Go' }).click();

  await expect(page.getByText('test11')).toBeVisible();

  await expect(page.getByText('test12')).toBeVisible();
});