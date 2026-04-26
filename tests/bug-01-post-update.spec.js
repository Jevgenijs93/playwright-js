const { test, expect } = require('@playwright/test');

const { signUp, createPost, uniqueEmail } = require('./utils/app-helpers');
test('BUG-01 / P0: editing a post should persist the submitted changes', async ({ page }) => {

  const email = uniqueEmail('bug01');
  const password = 'Password123!';

  const originalTitle = `Original title ${Date.now()}`;
  const originalBody = '<p>Original body</p>';

  const updatedTitle = `Updated title ${Date.now()}`;
  const updatedBody = '<p>Updated body</p>';

  await signUp(page, { email, password });

  await createPost(page, { title: originalTitle, htmlBody: originalBody });

  await page.getByRole('link', { name: /edit post/i }).click();

  await page.getByLabel('Title').fill(updatedTitle);
  await page.getByLabel('Html body').fill(updatedBody);

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('Post was saved')).toBeVisible();

  await expect(page.getByRole('heading', { name: updatedTitle })).toBeVisible();

  await expect(page.locator('div.mb-4')).toContainText('Updated body');

  await expect(page.getByRole('heading', { name: originalTitle })).toHaveCount(0);
});