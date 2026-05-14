<script>
	import { getScenario } from '../lib/scenarios/index.js';
	import EvmsMetricsDashboard from './EvmsMetricsDashboard.svelte';

	let { scenarioId, gameStore, beadsStore, onBack } = $props();

	const scenario = $derived(getScenario(scenarioId));
	const turn = $derived(scenario?.turns[gameStore.turnIndex]);
	const isLastTurn = $derived(scenario && gameStore.turnIndex >= scenario.turns.length);

	function handleChoice(choice) {
		gameStore.selectChoice(choice);
	}

	function handleNext() {
		const wasLastTurn = gameStore.turnIndex >= scenario.turns.length - 1;
		gameStore.advanceAfterFeedback();
		if (wasLastTurn) {
			beadsStore.completeBead(scenarioId);
		}
	}

	function handleBack() {
		gameStore.resetGame();
		onBack?.();
	}
</script>

{#if scenario}
	<div class="play-container">
		<header class="play-header">
			<button class="back-btn" onclick={handleBack} aria-label="Back to scenarios">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
			</button>
			<div class="header-info">
				<h2>{scenario.title}</h2>
				<p class="turn-progress">Turn {gameStore.turnIndex + 1} of {scenario.turns.length}</p>
			</div>
		</header>

		<div class="play-content">
			<aside class="metrics-sidebar">
				<EvmsMetricsDashboard metrics={gameStore.metrics} bac={scenario.bac} />
			</aside>

			<main class="narrative-area">
				{#if isLastTurn}
					<div class="scenario-complete">
						<div class="complete-icon">✓</div>
						<h3>Scenario Complete!</h3>
						<p>You've finished "{scenario.title}". Review your final EVMS metrics above.</p>
						<button class="primary-btn" onclick={handleBack}>Return to Scenarios</button>
					</div>
				{:else if turn}
					<div class="narrative-card">
						<p class="narrative">{turn.narrative}</p>

						{#if gameStore.awaitingAdvance}
							{#if gameStore.feedback}
								<div class="feedback">
									<strong>Outcome:</strong> {gameStore.feedback}
								</div>
							{/if}
							<button
								type="button"
								class="next-btn"
								onclick={handleNext}
								aria-label="Continue to next decision"
							>
								Next
							</button>
						{:else}
							<div class="choices">
								{#each turn.choices as choice}
									<button
										type="button"
										class="choice-btn"
										onclick={() => handleChoice(choice)}
									>
										{choice.text}
									</button>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			</main>
		</div>
	</div>
{/if}

<style>
	.play-container {
		display: flex;
		flex-direction: column;
		min-height: 60vh;
		gap: var(--space-4);
	}

	.play-header {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--border);
	}

	.back-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: var(--radius);
		background: var(--surface-2);
		border: 1px solid var(--border);
		color: var(--text-2);
		cursor: pointer;
		transition: all 0.2s;
	}

	.back-btn:hover {
		background: var(--surface-3);
		color: var(--text-1);
	}

	.header-info h2 {
		margin: 0;
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--text-1);
	}

	.turn-progress {
		margin: var(--space-1) 0 0;
		font-size: var(--text-sm);
		color: var(--text-2);
	}

	.play-content {
		display: grid;
		grid-template-columns: 280px 1fr;
		gap: var(--space-6);
		align-items: start;
	}

	@media (max-width: 768px) {
		.play-content {
			grid-template-columns: 1fr;
		}

		.metrics-sidebar {
			order: 2;
		}
	}

	.narrative-card {
		background: var(--surface-2);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		border: 1px solid var(--border);
	}

	.narrative {
		font-size: var(--text-lg);
		line-height: 1.6;
		color: var(--text-1);
		margin: 0 0 var(--space-4);
	}

	.feedback {
		background: var(--accent-muted);
		border-left: 4px solid var(--accent);
		padding: var(--space-3);
		border-radius: var(--radius);
		margin-bottom: var(--space-4);
		font-size: var(--text-sm);
		color: var(--text-1);
	}

	.choices {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.choice-btn {
		padding: var(--space-4);
		text-align: left;
		background: var(--surface-1);
		border: 2px solid var(--border);
		border-radius: var(--radius);
		font-size: var(--text-base);
		font-weight: 500;
		color: var(--text-1);
		cursor: pointer;
		transition: all 0.2s;
	}

	.choice-btn:hover {
		border-color: var(--accent);
		background: var(--accent-muted);
	}

	.next-btn {
		margin-top: var(--space-4);
		padding: var(--space-3) var(--space-6);
		background: var(--accent);
		color: white;
		border: none;
		border-radius: var(--radius);
		font-size: var(--text-base);
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}

	.next-btn:hover {
		background: var(--accent-hover);
	}

	.scenario-complete {
		text-align: center;
		padding: var(--space-8);
		background: var(--success-muted);
		border-radius: var(--radius-lg);
		border: 1px solid var(--success);
	}

	.complete-icon {
		width: 64px;
		height: 64px;
		margin: 0 auto var(--space-4);
		background: var(--success);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		font-weight: 700;
	}

	.scenario-complete h3 {
		margin: 0 0 var(--space-2);
		font-size: var(--text-xl);
		color: var(--text-1);
	}

	.scenario-complete p {
		margin: 0 0 var(--space-4);
		color: var(--text-2);
	}

	.primary-btn {
		padding: var(--space-3) var(--space-6);
		background: var(--accent);
		color: white;
		border: none;
		border-radius: var(--radius);
		font-size: var(--text-base);
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}

	.primary-btn:hover {
		background: var(--accent-hover);
	}
</style>
