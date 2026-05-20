/**
 * Capture gameplay screenshots for README
 * Run: npx playwright test tests/screenshots.spec.js --project=chromium
 */
import { test, expect } from '@playwright/test';
import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = __dirname + '/../docs/screenshots';

test.describe('Screenshot capture', () => {
	test.beforeAll(() => {
		if (!existsSync(SCREENSHOTS_DIR)) {
			mkdirSync(SCREENSHOTS_DIR, { recursive: true });
		}
	});

	test('capture gameplay screenshots', async ({ page }) => {
		page.setViewportSize({ width: 1200, height: 800 });

		await page.goto('/');
		await page.evaluate(() => localStorage.clear());
		await page.reload();
		await page.locator('#evms-interactive-root').waitFor({ state: 'visible', timeout: 20000 });
		await page.locator('#evms-interactive-root').getByRole('heading', { level: 1 }).waitFor({ state: 'visible', timeout: 20000 });

		// 1. Learning paths, then project scenario list
		await page.screenshot({
			path: `${SCREENSHOTS_DIR}/01-home-scenario-select.png`,
			fullPage: true
		});

		await page.getByRole('button', { name: /Learning path: Project scenarios/i }).click();
		await expect(page.getByRole('heading', { level: 2, name: 'Project scenarios' })).toBeVisible({ timeout: 8000 });

		// 2. Click first scenario, show first turn
		await page.getByRole('button', { name: /Scenario: Building a Fence/i }).click();
		await page.waitForSelector('.narrative-card', { timeout: 5000 });
		await page.screenshot({
			path: `${SCREENSHOTS_DIR}/02-gameplay-first-turn.png`,
			fullPage: true
		});

		// 3. After making a choice - outcome feedback and metrics
		await page.getByRole('button', { name: /Set posts as planned/i }).click();
		await page.waitForTimeout(500);
		await page.screenshot({
			path: `${SCREENSHOTS_DIR}/03-after-choice-metrics.png`,
			fullPage: true
		});

		await page.getByRole('button', { name: 'Continue to next decision' }).click();
		for (let i = 0; i < 4; i++) {
			await page.locator('.choice-btn').first().click();
			await page.getByRole('button', { name: 'Continue to next decision' }).click();
			await page.waitForTimeout(300);
		}
		await page.screenshot({
			path: `${SCREENSHOTS_DIR}/04-scenario-complete.png`,
			fullPage: true
		});

		// 5. Back to list - progress updated
		await page.getByRole('button', { name: /Return to Scenarios/i }).click();
		await page.waitForTimeout(300);
		await page.screenshot({
			path: `${SCREENSHOTS_DIR}/05-progress-unlocked.png`,
			fullPage: true
		});
	});
});
