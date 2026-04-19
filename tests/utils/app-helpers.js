async function signUp(page, { email, password }) {
  await page.goto('http://localhost:3000/signup');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: /sign up/i }).click();
}

async function createPost(page, { title, htmlBody }) {
  await page.getByRole('link', { name: /new post/i }).click();
  await page.getByLabel('Title').fill(title);
  await page.getByLabel('Html body').fill(htmlBody);
  await page.getByRole('button', { name: /save/i }).click();
}

function uniqueEmail(prefix = 'user') {
  return `${prefix}-${Date.now()}@test.com`;
}

module.exports = { signUp, createPost, uniqueEmail };