const { test, expect } = require('@playwright/test');
// Import helper functions for registration, post creation, and unique email generation
const { signUp, createPost, uniqueEmail } = require('./utils/app-helpers');

test('BUG-01 / P0: editing a post should persist the submitted changes', async ({ page }) => {
  // Create unique data for this test run
  const email = uniqueEmail('bug01');
  const password = 'Password123!';

  // Initial post data
  const originalTitle = `Original title ${Date.now()}`;
  const originalBody = '<p>Original body</p>';

  // Updated post data
  const updatedTitle = `Updated title ${Date.now()}`;
  const updatedBody = '<p>Updated body</p>';

  // Sign up a new user
  await signUp(page, { email, password });

  // Create a new post
  await createPost(page, { title: originalTitle, htmlBody: originalBody });

  // Open edit page
  await page.getByRole('link', { name: /edit post/i }).click();

  // Change title and body
  await page.getByLabel('Title').fill(updatedTitle);
  await page.getByLabel('Html body').fill(updatedBody);

  // Save changes
  await page.getByRole('button', { name: 'Save' }).click();

  // Check success message
  await expect(page.getByText('Post was saved')).toBeVisible();

  // Check updated title is shown
  await expect(page.getByRole('heading', { name: updatedTitle })).toBeVisible();

  // Check updated body is shown
  await expect(page.locator('div.mb-4')).toContainText('Updated body');

  // Check old title is not shown anymore
  await expect(page.getByRole('heading', { name: originalTitle })).toHaveCount(0);
});