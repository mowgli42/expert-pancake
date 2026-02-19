<script>
	import AdvancedTopics from './components/AdvancedTopics.svelte';
	import BeadsProgress from './components/BeadsProgress.svelte';
	import EvmsReference from './components/EvmsReference.svelte';
	import ScenarioCard from './components/ScenarioCard.svelte';
	import ScenarioPlay from './components/ScenarioPlay.svelte';
	import { scenarios } from './lib/scenarios/index.js';
	import { createBeadsStore } from './lib/stores/beadsStore.svelte.js';
	import { createGameStore } from './lib/stores/gameStore.svelte.js';

	const beadsStore = createBeadsStore();
	const gameStore = createGameStore();
	let currentScenarioId = $state(null);
	let referenceOpen = $state(false);
	let advancedTopicsView = $state(false);
	const allComplete = $derived(beadsStore.completedCount === 10);

	$effect(function restoreInProgressGame() {
		const sid = gameStore.scenarioId;
		if (!sid || currentScenarioId) return;
		const scenario = scenarios.find((s) => s.id === sid);
		if (!scenario || gameStore.turnIndex >= scenario.turns.length) return;
		currentScenarioId = sid;
	});

	function handleSelectScenario(scenario) {
		gameStore.initScenario(scenario);
		currentScenarioId = scenario.id;
	}

	function handleBack() {
		currentScenarioId = null;
	}

	function handleResetProgress() {
		beadsStore.resetProgress();
		gameStore.resetGame();
	}
</script>

<EvmsReference open={referenceOpen} onClose={() => (referenceOpen = false)} />

<div class="app">
	<header class="app-header">
		<div class="header-content">
			<div class="header-top">
				<div>
					<h1>EVMS Training</h1>
					<p class="tagline">Earned Value Management — Learn by doing</p>
				</div>
				<button
					class="ref-btn"
					onclick={() => (referenceOpen = true)}
					aria-label="Open EVMS reference"
				>
					Reference
				</button>
			</div>
			<BeadsProgress
				beads={beadsStore.beads}
				completedCount={beadsStore.completedCount}
				totalCount={beadsStore.totalCount}
			/>
		</div>
	</header>

	<main class="app-main">
		{#if currentScenarioId}
			<ScenarioPlay
				scenarioId={currentScenarioId}
				gameStore={gameStore}
				beadsStore={beadsStore}
				onBack={handleBack}
			/>
		{:else if advancedTopicsView}
			<AdvancedTopics onBack={() => (advancedTopicsView = false)} />
		{:else}
			<section class="scenario-grid">
				{#if allComplete}
					<div class="recommended-banner">
						<strong>You've completed all 10 scenarios!</strong>
						<p>Explore when EVMS may not be the best fit—learn to choose the right tracking approach.</p>
						<button class="advanced-cta" onclick={() => (advancedTopicsView = true)}>
							Advanced Topics →
						</button>
					</div>
				{/if}
				<div class="section-header">
					<h2>Choose Your Scenario</h2>
					<p class="section-desc">
						Progress through 10 real-world projects—from a backyard fence to a lunar mission.
						Each scenario presents decisions that affect your EVMS metrics.
					</p>
				</div>
				<div class="cards">
					{#each scenarios as scenario}
						<ScenarioCard
							scenario={scenario}
							unlocked={beadsStore.isUnlocked(scenario.id)}
							completed={beadsStore.isCompleted(scenario.id)}
							onSelect={() => handleSelectScenario(scenario)}
						/>
					{/each}
				</div>
				<div class="advanced-section">
					<button class="advanced-btn" onclick={() => (advancedTopicsView = true)}>
						Advanced Topics: When EVMS Isn't the Best Fit
					</button>
					<p class="advanced-hint">
						{#if allComplete}
							Recommended after completing all scenarios above.
						{:else}
							Available anytime. Best explored after completing the 10 scenarios.
						{/if}
					</p>
				</div>
				{#if beadsStore.completedCount > 0}
					<button class="reset-btn" onclick={handleResetProgress}>Reset Progress</button>
				{/if}
			</section>
		{/if}
	</main>

	<footer class="app-footer">
		<p>
			Built with Svelte · Design: IxDF principles · Spec: OpenSpec · Progress: Beads
		</p>
	</footer>
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.app-header {
		background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
		color: white;
		padding: var(--space-6);
		box-shadow: var(--shadow-md);
	}

	.header-content {
		max-width: var(--content-max);
		margin: 0 auto;
	}

	.header-top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-4);
		margin-bottom: var(--space-4);
	}

	.ref-btn {
		flex-shrink: 0;
		padding: var(--space-2) var(--space-4);
		background: rgba(255, 255, 255, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-radius: var(--radius);
		color: white;
		font-size: var(--text-sm);
		font-weight: 600;
		cursor: pointer;
	}

	.ref-btn:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.app-header h1 {
		margin: 0;
		font-size: var(--text-3xl);
		font-weight: 800;
		letter-spacing: -0.02em;
	}

	.tagline {
		margin: var(--space-2) 0 var(--space-4);
		font-size: var(--text-lg);
		opacity: 0.95;
	}

	.app-main {
		flex: 1;
		max-width: var(--content-max);
		margin: 0 auto;
		width: 100%;
		padding: var(--space-6);
	}

	.section-header {
		margin-bottom: var(--space-6);
	}

	.section-header h2 {
		margin: 0 0 var(--space-2);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--text-1);
	}

	.section-desc {
		margin: 0;
		font-size: var(--text-base);
		color: var(--text-2);
		line-height: 1.6;
		max-width: 60ch;
	}

	.recommended-banner {
		background: linear-gradient(135deg, var(--success-muted) 0%, rgba(5, 150, 105, 0.08) 100%);
		border: 1px solid var(--success);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
		margin-bottom: var(--space-6);
	}

	.recommended-banner strong {
		display: block;
		color: var(--text-1);
		font-size: var(--text-base);
		margin-bottom: var(--space-1);
	}

	.recommended-banner p {
		margin: 0 0 var(--space-3);
		color: var(--text-2);
		font-size: var(--text-sm);
		line-height: 1.5;
	}

	.advanced-cta {
		padding: var(--space-2) var(--space-4);
		background: var(--success);
		color: white;
		border: none;
		border-radius: var(--radius);
		font-weight: 600;
		font-size: var(--text-sm);
		cursor: pointer;
	}

	.advanced-cta:hover {
		opacity: 0.9;
	}

	.scenario-grid .cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--space-4);
	}

	.advanced-section {
		margin-top: var(--space-6);
		padding-top: var(--space-6);
		border-top: 1px solid var(--border);
	}

	.advanced-btn {
		display: block;
		width: 100%;
		max-width: 480px;
		padding: var(--space-4);
		background: var(--surface-2);
		border: 2px solid var(--border);
		border-radius: var(--radius-lg);
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--text-1);
		text-align: left;
		cursor: pointer;
		transition: all 0.2s;
	}

	.advanced-btn:hover {
		border-color: var(--accent);
		background: var(--accent-muted);
	}

	.advanced-hint {
		margin: var(--space-2) 0 0;
		font-size: var(--text-sm);
		color: var(--text-3);
	}

	.reset-btn {
		margin-top: var(--space-6);
		padding: var(--space-2) var(--space-4);
		font-size: var(--text-sm);
		color: var(--text-2);
		background: transparent;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		cursor: pointer;
		transition: all 0.2s;
	}

	.reset-btn:hover {
		color: var(--danger);
		border-color: var(--danger);
	}

	.app-footer {
		padding: var(--space-4);
		text-align: center;
		font-size: var(--text-sm);
		color: var(--text-3);
		border-top: 1px solid var(--border);
	}
</style>
