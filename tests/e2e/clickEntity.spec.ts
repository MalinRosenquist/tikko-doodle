import { test, expect } from '@playwright/test';

test('clicking entity increases coins', async ({ page }) => {
  await page.goto('/');

  const coinDisplay = page.getByTestId('coin-display');
  const entityButton = page.getByTestId('entity-button');

  await expect(coinDisplay).toHaveText('Coins: 0');
  await entityButton.click();
  await expect(coinDisplay).toHaveText('Coins: 1');
});
