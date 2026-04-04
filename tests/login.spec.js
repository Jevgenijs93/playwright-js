const {test, expect} = require('@playwright/test');

test ('Test', async ({page}) => {
    await page.goto('https://google.com');
    await expect(page).toHaveTitle(/Google/);  
});