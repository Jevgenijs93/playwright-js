import { test, expect } from '@playwright/test';

const BASE_URL = 'https://hb-test.stage.sirenltd.dev/';

// Helper: click an option by exact visible text
async function chooseOption(page, text) {
  await page.getByText(text, { exact: true }).click();
}

// Helper: click the main Next button
async function clickNext(page) {
  await page.getByRole('button', { name: 'Next' }).click();
}

// Helper: go through the wizard until the contact step
async function completeFlowToContactStep(page) {
  await page.goto(BASE_URL);

  // Start the wizard from the landing page
  await page.getByPlaceholder('Enter ZIP Code').first().fill('10001');
  await page.getByRole('button', { name: 'Get estimate' }).first().click();

  // Step 1: service selection
  await expect(page.getByText('Which elements of the kitchen would you like to update?')).toBeVisible();
  await chooseOption(page, 'Kitchen cabinets');
  await clickNext(page);

  // Step 2: cabinets scope
  await expect(page.getByText('What would you like to do with your kitchen cabinets?')).toBeVisible();
  await chooseOption(page, 'Replace all or most cabinets');
  await clickNext(page);

  // Step 3: property type
  await expect(page.getByText('What type of property is this?')).toBeVisible();
  await chooseOption(page, 'Single family home');
  await clickNext(page);

  // Step 4: home type eligibility
  await expect(page.getByText('Is it a mobile, modular or manufactured home?')).toBeVisible();
  await chooseOption(page, 'No');
  await clickNext(page);

  // Step 5: authorization eligibility
  await expect(page.getByText('Are you the homeowner or authorized to make property changes?')).toBeVisible();
  await chooseOption(page, 'Yes');
  await clickNext(page);

  // Step 6: kitchen size
  await expect(page.getByText('What is the approximate size of your kitchen')).toBeVisible();

  // Use any visible input except checkbox, because the step also contains "Not sure"
  const sizeInput = page.locator('input:not([type="checkbox"]):visible').first();
  await expect(sizeInput).toBeVisible();
  await sizeInput.fill('120');
  await clickNext(page);

  // Step 7: budget
  await expect(page.getByText('Do you know what your approximate budget is?')).toBeVisible();
  await chooseOption(page, '$10K to $30K');
  await clickNext(page);

  // Wait until the contact step is rendered
  await expect(page.getByText('Who should I prepare this estimate for?')).toBeVisible({ timeout: 15000 });
}

test('User should successfully submit request and see thank-you page', async ({ page }) => {
  await completeFlowToContactStep(page);

  // On this page, both Full name and Email are regular visible inputs
  const contactInputs = page.locator('input:not([type="checkbox"]):visible');

  // Fill Full name and Email by order
  await expect(contactInputs.nth(0)).toBeVisible();
  await contactInputs.nth(0).fill('John Smith');

  await expect(contactInputs.nth(1)).toBeVisible();
  await contactInputs.nth(1).fill('johnsmith@example.com');

  await clickNext(page);

  // Phone step
  await expect(page.getByText('What is your phone number?')).toBeVisible();

  const phoneInput = page.locator('input:not([type="checkbox"]):visible').first();
  await expect(phoneInput).toBeVisible();
  await phoneInput.fill('9999999999');

  await page.getByRole('button', { name: 'Submit my request' }).click();

  // Phone confirmation step
  await expect(page.getByText('Please confirm your phone number')).toBeVisible();
  await page.getByRole('button', { name: 'Phone number is correct' }).click();

  // Success page
  await expect(
    page.getByText(/your contractor QA company will call soon!/i)
  ).toBeVisible();
});