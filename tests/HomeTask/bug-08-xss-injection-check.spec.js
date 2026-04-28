const { test, expect } = require('@playwright/test');

test('BUG-08: Stored XSS must on executed via Title and HTML Body', async ({ page }) => {
  let xssExecuted = false;

  // catch alert
  page.on('dialog', async (dialog) => {
    xssExecuted = true;
    await dialog.dismiss();
  });

  await page.goto('http://localhost:3000/users/sign_in');

  await page.getByLabel('Email').fill('test@tetetetet');
  await page.getByLabel('Password').fill('111111');
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.goto('http://localhost:3000/posts/new');

  await page
    .getByLabel('Title')
    .fill("<script>alert('xss')</script>");

  await page
    .getByLabel('Html body')
    .fill("<img src=x onerror=alert('xss')>");

  await page.getByRole('button', { name: 'Save' }).click();

  await page.waitForTimeout(1000);

  expect(xssExecuted).toBe(false);

  // additional DOM and HTML check
  await expect(page.locator('script')).toHaveCount(0);
  await expect(page.locator('img[onerror]')).toHaveCount(0);
});