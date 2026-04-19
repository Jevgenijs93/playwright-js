const { test, expect } = require('@playwright/test');
// Import helper functions: sign up, create post, search, and generate unique email
const { signUp, createPost, searchPosts, uniqueEmail } = require('./utils/app-helpers');

test('BUG-03 / P1: search should match title substrings, not only title suffixes', async ({ page }) => {
  // Generate unique user data for this test
  const email = uniqueEmail('bug03');
  const password = 'Password123!';

  // Create a unique post title
  const title = `Hello world ${Date.now()}`;

  // Step 1: Sign up a new user
  await signUp(page, { email, password });

  // Step 2: Create a post that will be used for search
  await createPost(page, { title, htmlBody: '<p>Body for search coverage</p>' });

  // Step 3: Search by part of the title (substring)
  await searchPosts(page, 'Hello');

  // Step 4: Verify that the post is found in search results
  await expect(page.getByRole('heading', { name: title })).toBeVisible();
});