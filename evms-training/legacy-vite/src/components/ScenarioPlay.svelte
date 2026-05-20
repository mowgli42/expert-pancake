<script>
	import { getPerformanceIndicator, summarizeScenarioComplete } from '../lib/evms/calculations.js';
	import { getScenario } from '../lib/scenarios/index.js';
	import EvmsMetricsDashboard from './EvmsMetricsDashboard.svelte';

	const CHOICE_REVEAL_DELAY_MS = 400;

	let { scenarioId, gameStore, beadsStore, onBack } = $props();

	let choicesRevealReady = $state(true);
	let revealChoicesTimeoutId = undefined;

	const scenario = $derived(getScenario(scenarioId));
	const turn = $derived(scenario?.turns[gameStore.turnIndex]);
	const isLastTurn = $derived(scenario && gameStore.turnIndex >= scenario.turns.length);

	const completeSummary = $derived(
		isLastTurn && gameStore.metrics
			? summarizeScenarioComplete(gameStore.metrics, {
					plannedDurationDays: scenario.plannedDurationDays
				})
			: null
	);

	const scheduleSummaryIndicator = $derived(
		gameStore.metrics ? getPerformanceIndicator(gameStore.metrics.spi, 'index') : null
	);

	const budgetSummaryIndicator = $derived.by(function budgetSummaryIndicatorBody() {
		const m = gameStore.metrics;
		if (!m) return null;
		const c = getPerformanceIndicator(m.cpi, 'index');
		const v = getPerformanceIndicator(m.vac, 'variance');
		if (c === 'bad' || v === 'bad') return 'bad';
		if (c === 'warning' || v === 'warning') return 'warning';
		return 'good';
	});

	function clearRevealTimer() {
		if (revealChoicesTimeoutId !== undefined) {
			clearTimeout(revealChoicesTimeoutId);
			revealChoicesTimeoutId = undefined;
		}
	}

	function scheduleChoicesReveal() {
		choicesRevealReady = false;
		clearRevealTimer();
		revealChoicesTimeoutId = setTimeout(function revealChoices() {
			revealChoicesTimeoutId = undefined;
			choicesRevealReady = true;
			if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
				document.activeElement.blur();
			}
		}, CHOICE_REVEAL_DELAY_MS);
	}

	function handleChoice(choice) {
		gameStore.selectChoice(choice);
	}

	function handleNext() {
		const wasLastTurn = gameStore.turnIndex >= scenario.turns.length - 1;
		gameStore.advanceAfterFeedback();
		if (wasLastTurn) {
			clearRevealTimer();
			choicesRevealReady = true;
			beadsStore.completeBead(scenarioId);
			return;
		}
		scheduleChoicesReveal();
	}

	function handleBack() {
		clearRevealTimer();
		choicesRevealReady = true;
		gameStore.resetGame();
		onBack?.();
	}

	$effect(function scenarioChoicesRevealLifecycle() {
		scenarioId;
		choicesRevealReady = true;
		clearRevealTimer();

		return function cleanup() {
			clearRevealTimer();
		};
	});
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
				<p class="turn-progress">
					{#if isLastTurn}
						All turns complete
					{:else}
						Turn {gameStore.turnIndex + 1} of {scenario.turns.length}
					{/if}
				</p>
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
						<p class="complete-intro">
							You've finished "{scenario.title}". Review your final EVMS metrics in the panel on the left.
						</p>
						{#if completeSummary}
							<section class="complete-summary" aria-labelledby="complete-summary-title">
								<h4 id="complete-summary-title">How you did</h4>
								<div class="summary-columns">
									<article class="summary-card" data-indicator={scheduleSummaryIndicator}>
										<h5>Schedule</h5>
										<p class="summary-lede">{completeSummary.scheduleLede}</p>
										<p class="summary-detail">{completeSummary.scheduleDetail}</p>
									</article>
									<article class="summary-card" data-indicator={budgetSummaryIndicator}>
										<h5>Budget &amp; forecast</h5>
										<p class="summary-detail">{completeSummary.costWork}</p>
										<p class="summary-detail">{completeSummary.forecast}</p>
									</article>
								</div>
							</section>
						{/if}
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
						{:else if choicesRevealReady}
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
						{:else}
							<div class="choices-pending" aria-live="polite">
								<span class="choices-pending-text">Loading next decision…</span>
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

	.choices-pending {
		display: flex;
		align-items: center;
		min-height: 3.25rem;
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius);
		border: 2px dashed var(--border);
		background: var(--surface-1);
	}

	.choices-pending-text {
		font-size: var(--text-sm);
		color: var(--text-2);
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

	.complete-intro {
		margin: 0 auto var(--space-5);
		max-width: 52ch;
		color: var(--text-2);
		font-size: var(--text-base);
		line-height: 1.5;
	}

	.complete-summary {
		text-align: left;
		margin: 0 0 var(--space-6);
		padding: var(--space-5);
		background: var(--surface-1);
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
	}

	.complete-summary h4 {
		margin: 0 0 var(--space-4);
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--text-1);
		text-align: center;
	}

	.summary-columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-4);
	}

	@media (max-width: 700px) {
		.summary-columns {
			grid-template-columns: 1fr;
		}
	}

	.summary-card {
		padding: var(--space-4);
		background: var(--surface-2);
		border-radius: var(--radius);
		border-left: 4px solid var(--border);
		transition: border-color 0.2s;
	}

	.summary-card[data-indicator='good'] {
		border-left-color: var(--success);
	}

	.summary-card[data-indicator='warning'] {
		border-left-color: var(--warning);
	}

	.summary-card[data-indicator='bad'] {
		border-left-color: var(--danger);
	}

	.summary-card h5 {
		margin: 0 0 var(--space-3);
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-2);
	}

	.summary-lede {
		margin: 0 0 var(--space-2);
		font-size: var(--text-base);
		font-weight: 600;
		line-height: 1.45;
		color: var(--text-1);
	}

	.summary-detail {
		margin: 0 0 var(--space-2);
		font-size: var(--text-sm);
		line-height: 1.55;
		color: var(--text-2);
	}

	.summary-detail:last-child {
		margin-bottom: 0;
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
