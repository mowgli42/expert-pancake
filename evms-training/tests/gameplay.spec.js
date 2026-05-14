import { test, expect } from '@playwright/test';

async function ensureAppLoaded(page) {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 15000 });
}

test.describe('EVMS Training - Gameplay', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.evaluate(() => localStorage.clear());
		await page.reload();
		await ensureAppLoaded(page);
	});

	test('home page displays header and scenario grid', async ({ page }) => {
		// Header
		await expect(page.getByRole('heading', { level: 1 })).toContainText('EVMS Training');
		await expect(page.getByText('Earned Value Management')).toBeVisible();

		// Section header
		await expect(page.getByRole('heading', { level: 2 })).toContainText('Choose Your Scenario');
		await expect(page.getByText(/backyard fence to a lunar mission/)).toBeVisible();

		// Progress beads (in beads container)
		await expect(page.locator('.beads-container').getByText('Progress', { exact: true })).toBeVisible();
		await expect(page.getByText(/0\/10 scenarios/)).toBeVisible();
	});

	test('first scenario (Building a Fence) is unlocked and clickable', async ({ page }) => {
		const firstCard = page.getByRole('button', { name: /Scenario: Building a Fence/i });
		await expect(firstCard).toBeVisible();
		await expect(firstCard).toBeEnabled();

		// Should NOT show Locked badge on first card
		await expect(firstCard.getByText('Locked')).not.toBeVisible();
	});

	test('second scenario is locked initially', async ({ page }) => {
		const kitchenCard = page.getByRole('button', { name: /Scenario: Kitchen Renovation/i });
		await expect(kitchenCard).toBeVisible();
		await expect(kitchenCard).toBeDisabled();
	});

	test('clicking first scenario opens gameplay view', async ({ page }) => {
		await page.getByRole('button', { name: /Scenario: Building a Fence/i }).click();

		// Should show scenario title in play header
		await expect(page.getByRole('heading', { level: 2 })).toContainText('Building a Fence');
		await expect(page.getByText(/Turn 1 of 5/)).toBeVisible();

		// Back button
		await expect(page.getByRole('button', { name: /Back to scenarios/i })).toBeVisible();

		// EVMS Metrics sidebar
		await expect(page.getByRole('heading', { name: /EVMS Metrics/i })).toBeVisible();
	});

	test('narrative and choice buttons display', async ({ page }) => {
		await page.getByRole('button', { name: /Scenario: Building a Fence/i }).click();

		// Narrative text from first turn
		await expect(page.getByText(/Day 1: You're building a 100-foot wooden fence/)).toBeVisible();

		// Two choice buttons
		const choices = page.getByRole('button', { name: /Set posts as planned|Rush through post setting/i });
		await expect(choices.first()).toBeVisible();
		await expect(page.getByRole('button', { name: /Set posts as planned/i })).toBeVisible();
		await expect(page.getByRole('button', { name: /Rush through post setting/i })).toBeVisible();
	});

	test('after choice, outcome and Next appear; Next advances turn', async ({ page }) => {
		await page.getByRole('button', { name: /Scenario: Building a Fence/i }).click();

		await page.getByRole('button', { name: /Set posts as planned/i }).click();

		await expect(page.getByText(/Outcome:/)).toBeVisible();
		await expect(page.getByText(/On track!/)).toBeVisible();
		await expect(page.getByText(/Turn 1 of 5/)).toBeVisible();
		await expect(page.getByText(/Day 2:/)).not.toBeVisible();

		await page.getByRole('button', { name: /Continue to next decision|Next/i }).click();

		await expect(page.getByText(/Turn 2 of 5/)).toBeVisible();
		await expect(page.getByText(/Day 2:/)).toBeVisible();
	});

	test('EVMS metrics update after choices', async ({ page }) => {
		await page.getByRole('button', { name: /Scenario: Building a Fence/i }).click();

		// Initially metrics may show $0 or values after first render
		await expect(page.getByText('EVMS Metrics')).toBeVisible();

		// Make a choice (metrics update immediately)
		await page.getByRole('button', { name: /Set posts as planned/i }).click();

		// Metrics should show currency values (PV, EV, AC)
		await expect(page.locator('.metrics-grid').getByText(/\$[\d,]+/).first()).toBeVisible();
	});

	test('back button returns to scenario list', async ({ page }) => {
		await page.getByRole('button', { name: /Scenario: Building a Fence/i }).click();

		await expect(page.getByRole('heading', { level: 2 })).toContainText('Building a Fence');

		await page.getByRole('button', { name: /Back to scenarios/i }).click();

		await expect(page.getByRole('heading', { level: 2 })).toContainText('Choose Your Scenario');
		await expect(page.getByText(/Building a Fence/)).toBeVisible();
	});

	test('completing scenario 1 shows completion screen', async ({ page }) => {
		await page.getByRole('button', { name: /Scenario: Building a Fence/i }).click();

		// Complete all 5 turns (choice then Next each turn)
		for (let i = 0; i < 5; i++) {
			const choiceBtn = page
				.getByRole('button', {
					name: /Set posts as planned|Continue with rails|Work in light rain|Double down|Use standard stain/i
				})
				.first();
			await choiceBtn.click();
			await page.getByRole('button', { name: /Continue to next decision|Next/i }).click();
		}

		// Should show scenario complete
		await expect(page.getByText('Scenario Complete!')).toBeVisible();
		await expect(page.getByText(/You've finished/)).toBeVisible();
		await expect(page.getByRole('button', { name: /Return to Scenarios/i })).toBeVisible();
	});

	test('completed scenario unlocks next and updates beads', async ({ page }) => {
		await page.getByRole('button', { name: /Scenario: Building a Fence/i }).click();

		// Complete scenario 1 - 5 turns (choice + Next each)
		for (let i = 0; i < 5; i++) {
			await page.locator('.choice-btn').first().click();
			await page.getByRole('button', { name: /Continue to next decision|Next/i }).click();
			await page.waitForTimeout(300);
		}

		// Return to list
		await page.getByRole('button', { name: /Return to Scenarios/i }).click();

		// Progress should show 1/10
		await expect(page.getByText(/1\/10 scenarios/)).toBeVisible();

		// Kitchen Renovation should now be unlocked
		const kitchenCard = page.getByRole('button', { name: /Scenario: Kitchen Renovation/i });
		await expect(kitchenCard).toBeEnabled();
	});

	test('can play scenario 2 after completing scenario 1', async ({ page }) => {
		await page.getByRole('button', { name: /Scenario: Building a Fence/i }).click();
		for (let i = 0; i < 5; i++) {
			await page.locator('.choice-btn').first().click();
			await page.getByRole('button', { name: /Continue to next decision|Next/i }).click();
			await page.waitForTimeout(200);
		}
		await page.getByRole('button', { name: /Return to Scenarios/i }).click();

		// Start scenario 2
		await page.getByRole('button', { name: /Scenario: Kitchen Renovation/i }).click();

		await expect(page.getByRole('heading', { level: 2 })).toContainText('Kitchen Renovation');
		await expect(page.getByText(/Week 1:/)).toBeVisible();
	});
});
