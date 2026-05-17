import { test, expect } from '@playwright/test';

test.describe('Static HTML fallback (no JavaScript)', () => {
	test('curriculum outline and headings are visible when JavaScript is disabled', async ({ browser }) => {
		const context = await browser.newContext({ javaScriptEnabled: false });
		const page = await context.newPage();
		await page.goto('/', { waitUntil: 'domcontentloaded' });
		await expect(page.getByRole('heading', { level: 1 })).toContainText('EVMS Training');
		await expect(page.getByRole('heading', { name: /EVMS 101/ })).toBeVisible();
		await expect(page.getByRole('heading', { name: /Read the metrics/ })).toBeVisible();
		await expect(page.getByRole('heading', { name: /Project scenarios/ })).toBeVisible();
		await expect(page.getByText(/PMI — Practice Standard for Earned Value Management/i)).toBeVisible();
		await context.close();
	});
});
