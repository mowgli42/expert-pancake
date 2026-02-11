<script>
	import { scenarios } from './lib/scenarios/index.js';
	import { createBeadsStore } from './lib/stores/beadsStore.svelte.js';
	import { createGameStore } from './lib/stores/gameStore.svelte.js';
	import BeadsProgress from './components/BeadsProgress.svelte';
	import ScenarioCard from './components/ScenarioCard.svelte';
	import ScenarioPlay from './components/ScenarioPlay.svelte';

	const beadsStore = createBeadsStore();
	const gameStore = createGameStore();

	let currentScenarioId = $state(null);

	// Restore in-progress game on load (gameStore restores from localStorage in its constructor)
	$effect(() => {
		const sid = gameStore.scenarioId;
		if (sid && !currentScenarioId) {
			const scenario = scenarios.find((s) => s.id === sid);
			if (scenario && gameStore.turnIndex < scenario.turns.length) {
				currentScenarioId = sid;
			}
		}
	});

	function handleSelectScenario(scenario) {
		gameStore.initScenario(scenario);
		currentScenarioId = scenario.id;
	}

	function handleBack() {
		currentScenarioId = null;
	}
</script>

<div class="app">
	<header class="app-header">
		<div class="header-content">
			<h1>EVMS Training</h1>
			<p class="tagline">Earned Value Management — Learn by doing</p>
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
		{:else}
			<section class="scenario-grid">
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
				{#if beadsStore.completedCount > 0}
					<button
						class="reset-btn"
						onclick={() => {
							beadsStore.resetProgress();
							gameStore.resetGame();
						}}
					>
						Reset Progress
					</button>
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

	.scenario-grid .cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--space-4);
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
