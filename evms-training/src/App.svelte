<script>
	import { onMount } from 'svelte';
	import BeadsProgress from './components/BeadsProgress.svelte';
	import JsErrorBanner from './components/JsErrorBanner.svelte';
	import ThreadPicker from './components/ThreadPicker.svelte';
	import { trackPathSelected } from './lib/analytics.js';
	import { scenarios } from './lib/scenarios/index.js';
	import { PDU_DISCLAIMER, THREAD_IDS } from './lib/threads/index.js';
	import { createBeadsStore } from './lib/stores/beadsStore.svelte.js';
	import { createGameStore } from './lib/stores/gameStore.svelte.js';
	import { createProgressStore } from './lib/stores/progressStore.svelte.js';
	import { flushPendingWrites, isStorageAvailable } from './lib/storage.js';

	const beadsStore = createBeadsStore();
	const gameStore = createGameStore();
	const progressStore = createProgressStore();

	let currentScenarioId = $state(null);
	let activeThread = $state(null);
	let storageWarning = $state(false);

	let Evms101Thread = $state(null);
	let MetricsLiteracyThread = $state(null);
	let ScenarioCard = $state(null);
	let ScenarioPlay = $state(null);

	const threadLoaders = {
		[THREAD_IDS.evms101]: () => import('./components/Evms101Thread.svelte'),
		[THREAD_IDS.metricsLiteracy]: () => import('./components/MetricsLiteracyThread.svelte'),
		[THREAD_IDS.projects]: () => import('./components/ScenarioCard.svelte')
	};

	async function loadThreadComponent(threadId) {
		if (threadId === THREAD_IDS.evms101 && !Evms101Thread) {
			Evms101Thread = (await threadLoaders[threadId]()).default;
		}
		if (threadId === THREAD_IDS.metricsLiteracy && !MetricsLiteracyThread) {
			MetricsLiteracyThread = (await threadLoaders[threadId]()).default;
		}
		if (threadId === THREAD_IDS.projects) {
			if (!ScenarioCard) {
				ScenarioCard = (await threadLoaders[threadId]()).default;
			}
			if (!ScenarioPlay) {
				ScenarioPlay = (await import('./components/ScenarioPlay.svelte')).default;
			}
		}
	}

	$effect(function restoreInProgressGame() {
		if (activeThread !== THREAD_IDS.projects) return;
		const sid = gameStore.scenarioId;
		if (!sid || currentScenarioId) return;
		const scenario = scenarios.find((s) => s.id === sid);
		if (!scenario || gameStore.turnIndex >= scenario.turns.length) return;
		currentScenarioId = sid;
		loadThreadComponent(THREAD_IDS.projects);
	});

	onMount(function checkStorage() {
		storageWarning = !isStorageAvailable();
		return function onUnload() {
			flushPendingWrites();
		};
	});

	async function handleSelectThread(threadId) {
		await loadThreadComponent(threadId);
		activeThread = threadId;
		trackPathSelected(threadId);
	}

	function handleLeaveThread() {
		activeThread = null;
	}

	function handleSelectScenario(scenario) {
		gameStore.initScenario(scenario);
		currentScenarioId = scenario.id;
	}

	function handleBackFromScenario() {
		currentScenarioId = null;
	}

	function handleResetProgress() {
		beadsStore.resetProgress();
		gameStore.resetGame();
	}
</script>

<a class="skip-link" href="#main-content">Skip to main content</a>
<JsErrorBanner />

<div class="app">
	<header class="app-header">
		<div class="header-content">
			<h1>EVMS Training</h1>
			<p class="tagline">Earned Value Management — Learn by doing</p>
			{#if activeThread === THREAD_IDS.projects}
				<BeadsProgress
					beads={beadsStore.beads}
					completedCount={beadsStore.completedCount}
					totalCount={beadsStore.totalCount}
				/>
			{/if}
		</div>
	</header>

	<main id="main-content" class="app-main" tabindex="-1">
		{#if storageWarning}
			<p class="storage-warning" role="status">
				Progress cannot be saved in this browser mode (private browsing or storage blocked). You can still
				practice; reload may reset scenarios.
			</p>
		{/if}

		{#if activeThread === THREAD_IDS.evms101 && Evms101Thread}
			<Evms101Thread onBack={handleLeaveThread} progressStore={progressStore} />
		{:else if activeThread === THREAD_IDS.metricsLiteracy && MetricsLiteracyThread}
			<MetricsLiteracyThread onBack={handleLeaveThread} progressStore={progressStore} />
		{:else if activeThread === THREAD_IDS.projects && ScenarioCard && ScenarioPlay}
			{#if currentScenarioId}
				<ScenarioPlay
					scenarioId={currentScenarioId}
					gameStore={gameStore}
					beadsStore={beadsStore}
					onBack={handleBackFromScenario}
				/>
			{:else}
				<button type="button" class="breadcrumb" onclick={handleLeaveThread}>
					← Learning paths
				</button>
				<section class="scenario-grid" aria-labelledby="scenarios-heading">
					<div class="section-header">
						<h2 id="scenarios-heading">Project scenarios</h2>
						<p class="section-desc">
							Progress through 10 real-world projects—from a backyard fence to a lunar mission.
							Each scenario presents decisions that affect your EVMS metrics. Estimated time: 4–6 hours
							for all ten.
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
						<button class="reset-btn" onclick={handleResetProgress}>Reset Progress</button>
					{/if}
				</section>
			{/if}
		{:else if activeThread}
			<p class="loading-thread" role="status" aria-live="polite">Loading learning path…</p>
		{:else}
			<ThreadPicker onSelectThread={handleSelectThread} />
		{/if}
	</main>

	<footer class="app-footer">
		<p>
			Aligned with EIA-748 (ANSI-748) intent and PMI Practice Standard teaching language.
			{PDU_DISCLAIMER}
		</p>
		<p class="footer-meta">Built with Svelte · Design: IxDF principles · Spec: OpenSpec · Progress: Beads</p>
	</footer>
</div>

<style>
	.skip-link {
		position: absolute;
		left: -9999px;
		z-index: 9999;
		padding: var(--space-2) var(--space-4);
		background: var(--accent-dark);
		color: white;
		text-decoration: none;
		font-weight: 600;
		border-radius: var(--radius);
	}

	.skip-link:focus {
		left: var(--space-4);
		top: var(--space-4);
	}

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

	.storage-warning {
		padding: var(--space-3) var(--space-4);
		margin-bottom: var(--space-4);
		background: #fff7ed;
		border: 1px solid #fdba74;
		border-radius: var(--radius);
		font-size: var(--text-sm);
		color: #9a3412;
	}

	.loading-thread {
		padding: var(--space-6);
		text-align: center;
		color: var(--text-2);
	}

	.breadcrumb {
		display: inline-flex;
		margin-bottom: var(--space-4);
		padding: 0;
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--accent);
		background: none;
		border: none;
		cursor: pointer;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.breadcrumb:hover {
		color: var(--accent-dark);
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
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
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
		padding: var(--space-4) var(--space-6);
		text-align: center;
		font-size: var(--text-sm);
		color: var(--text-3);
		border-top: 1px solid var(--border);
		max-width: var(--content-max);
		margin: 0 auto;
	}

	.app-footer p {
		margin: 0 0 var(--space-2);
		line-height: 1.5;
	}

	.footer-meta {
		font-size: var(--text-xs);
	}
</style>
