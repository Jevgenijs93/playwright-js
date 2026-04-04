const {test, expect} = require('@playwright/test');
const { link } = require('node:fs');

test ('Test', async ({page}) => {
    await page.goto('https://example.com');
    await expect(page).toHaveURL('https:/example.com');
    await expect(page).toHaveTitle(/Example Domain/);
    await expect(page.getByRole('link', {name: /Learn more/i})).toBeVisible();
    await page.getByRole('link', {name: /Learn more/i}).click();

    await expect(page).toHaveURL(/.*iana.org/)
    await page.getByRole('link', {name: /RFC 2606/i}).click();

    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'Report errata', exact: true }).click(),
    ])

    await newPage.waitForLoadState();
    await newPage.getByRole('combobox', {name: /area acronym/i}).selectOption('app');
    await newPage.getByRole('button', {name: /Search/i}).click();
    await expect(newPage.getByRole('heading', {name: /status: verified/i})
).toHaveText(/Status: Verified \(588\)/);
    await newPage.getByRole('button', {name: 'Reset Fields'}).click();
    await newPage.getByRole('button', {name: /Search/i}).click();
    await expect(newPage.getByRole('heading', {name: /status: verified/i})
).toHaveText(/Status: Verified \(3659\)/);

});