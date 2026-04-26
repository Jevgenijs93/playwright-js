const { test, expect } = require('@playwright/test');
const { signUp, createPost, searchPosts, uniqueEmail } = require('./utils/app-helpers');
test('BUG-03 / P1: search should match title substrings, not only title suffixes', async ({ page }) => {

  const email = uniqueEmail('bug03');
  const password = 'Password123!';

  const title = `Hello world ${Date.now()}`;

  await signUp(page, { email, password });

  await createPost(page, { title, htmlBody: '<p>Body for search coverage</p>' });

  await searchPosts(page, 'Hello');

  await expect(page.getByRole('heading', { name: title })).toBeVisible();
});