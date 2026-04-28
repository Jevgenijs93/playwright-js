const { test, expect } = require('@playwright/test');

test('BUG-14: user can not edit post from post page', async ({ page }) => {

  await page.goto('http://localhost:3000/users/sign_in');

  await page.getByLabel('Email').fill('test@tetetetet');
  await page.getByLabel('Password').fill('111111');
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.goto('http://localhost:3000/posts/17');

  await page.getByRole('link', { name: 'Edit' }).click();

  await page.getByLabel('Title').fill('1111112');
  await page.getByLabel('Html body').fill('1111112');


  await page.getByRole('button', { name: 'Save' }).click();

  // title
  await expect(page.getByText('1111112').first()).toBeVisible();
  // HTML body
  await expect(page.getByText('1111112').nth(1)).toBeVisible();
});