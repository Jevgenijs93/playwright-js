import { test, expect } from '@playwright/test';

const BASE_URL = 'https://hb-test.stage.sirenltd.dev/';

async function chooseOption(page, text) {
  await page.locator(`text="${text}"`).last().click();
}

async function clickNext(page) {
  await page.getByRole('button', { name: 'Next' }).click();
}

async function completeFlowToContactStep(page) {
  await page.goto(BASE_URL);

  await page.getByPlaceholder('Enter ZIP Code').first().fill('10001');
  await page.getByRole('button', { name: 'Get estimate' }).first().click();

  await expect(page.getByText('Which elements of the kitchen would you like to update?')).toBeVisible();
  await chooseOption(page, 'Kitchen cabinets');
  await clickNext(page);

  await expect(page.getByText('What would you like to do with your kitchen cabinets?')).toBeVisible();
  await chooseOption(page, 'Replace all or most cabinets');
  await clickNext(page);

  await expect(page.getByText('What type of property is this?')).toBeVisible();
  await chooseOption(page, 'Single family home');
  await clickNext(page);

  await expect(page.getByText('Is it a mobile, modular or manufactured home?')).toBeVisible();
  await chooseOption(page, 'No');
  await clickNext(page);

  await expect(page.getByText('Are you the homeowner or authorized to make property changes?')).toBeVisible();
  await chooseOption(page, 'Yes');
  await clickNext(page);

  await expect(page.getByText('What is the approximate size of your kitchen')).toBeVisible();
  await page.locator('input:visible').first().fill('120');
  await clickNext(page);

  await expect(page.getByText('Do you know what your approximate budget is?')).toBeVisible();
  await chooseOption(page, '$10K to $30K');
  await clickNext(page);

  await expect(page.getByText('Who should I prepare this estimate for?')).toBeVisible({ timeout: 15000 });
}

test('Contact form should validate invalid name and email', async ({ page }) => {
  await completeFlowToContactStep(page);

  const visibleInputs = page.locator('input:visible');

  await visibleInputs.nth(0).fill('111');
  await visibleInputs.nth(1).fill('32');

  await clickNext(page);

  await expect(
    page.getByText('Full name must be written in English letters and dashes if needed.')
  ).toBeVisible();

  await expect(
    page.getByText('Email address must be at least 6 characters long.')
  ).toBeVisible();
});