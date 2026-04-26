import { test, expect } from '@playwright/test';

const BASE_URL = 'https://hb-test.stage.sirenltd.dev/';

test('User should successfully submit request and see thank-you page', async ({ page }) => {
  test.setTimeout(60000);

  const next = () => page.getByRole('button', { name: 'Next' }).click();
  const choose = (text) => page.getByText(text, { exact: true }).click();
  const input = () => page.locator('input:not([type="checkbox"]):visible').first();

  await page.goto(BASE_URL);

  await page.getByPlaceholder('Enter ZIP Code').first().fill('10001');
  await page.getByRole('button', { name: 'Get estimate' }).first().click();

  await expect(page.getByText('Which elements of the kitchen would you like to update?')).toBeVisible();
  await choose('Kitchen cabinets');
  await next();

  await expect(page.getByText('What would you like to do with your kitchen cabinets?')).toBeVisible();
  await choose('Replace all or most cabinets');
  await next();

  await expect(page.getByText('What type of property is this?')).toBeVisible();
  await choose('Single family home');
  await next();

  await expect(page.getByText('Is it a mobile, modular or manufactured home?')).toBeVisible();
  await choose('No');
  await next();

  await expect(page.getByText('Are you the homeowner or authorized to make property changes?')).toBeVisible();
  await choose('Yes');
  await next();

  await expect(page.getByText('What is the approximate size of your kitchen')).toBeVisible();
  await input().fill('120');
  await next();

  await expect(page.getByText('Do you know what your approximate budget is?')).toBeVisible();
  await choose('$10K to $30K');
  await next();

  await expect(page.getByText('Who should I prepare this estimate for?')).toBeVisible();
  const contactInputs = page.locator('input:not([type="checkbox"]):visible');
  await contactInputs.nth(0).fill('John Smith');
  await contactInputs.nth(1).fill('johnsmith@example.com');
  await next();

  await expect(page.getByText('What is your phone number?')).toBeVisible();
  await input().fill('9999999999');
  await page.getByRole('button', { name: 'Submit my request' }).click();

  const confirmBtn = page.getByRole('button', { name: /phone number is correct/i });
  if (await confirmBtn.isVisible().catch(() => false)) {
    await confirmBtn.click();
  }

  await page.waitForTimeout(3000);

  console.log('URL:', page.url());
  console.log('BODY TEXT:\n', await page.locator('body').innerText());
  await page.screenshot({ path: 'after-submit.png', fullPage: true });

  await expect(page.getByText('What is your phone number?')).not.toBeVisible();
});