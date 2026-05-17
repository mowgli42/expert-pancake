<script>
	import { calculateEvmsMetrics } from '../lib/evms/calculations.js';
	import { metricsLiteracyScenarios } from '../lib/threads/metricsLiteracyScenarios.js';
	import EvmsMetricsDashboard from './EvmsMetricsDashboard.svelte';

	let { onBack } = $props();

	let scenarioIndex = $state(0);
	let questionIndex = $state(0);
	let picked = $state(null);
	let showFeedback = $state(false);

	const scenario = $derived(metricsLiteracyScenarios[scenarioIndex]);
	const question = $derived(scenario?.questions[questionIndex]);
	const metrics = $derived(
		scenario ? calculateEvmsMetrics({ pv: scenario.pv, ev: scenario.ev, ac: scenario.ac, bac: scenario.bac }) : null
	);
	const atLastQuestion = $derived(
		scenario && questionIndex >= scenario.questions.length - 1
	);
	const atLastScenario = $derived(scenarioIndex >= metricsLiteracyScenarios.length - 1);

	function pickOption(i) {
		if (showFeedback) return;
		picked = i;
	}

	function checkAnswer() {
		if (picked == null || !question || showFeedback) return;
		showFeedback = true;
	}

	function advance() {
		if (!scenario || !showFeedback) return;
		if (questionIndex < scenario.questions.length - 1) {
			questionIndex += 1;
			picked = null;
			showFeedback = false;
			return;
		}
		if (scenarioIndex < metricsLiteracyScenarios.length - 1) {
			scenarioIndex += 1;
			questionIndex = 0;
			picked = null;
			showFeedback = false;
			return;
		}
		finishAll();
	}

	function finishAll() {
		scenarioIndex = 0;
		questionIndex = 0;
		picked = null;
		showFeedback = false;
		onBack?.();
	}

	function handleBack() {
		scenarioIndex = 0;
		questionIndex = 0;
		picked = null;
		showFeedback = false;
		onBack?.();
	}
</script>

{#if scenario && question && metrics}
	<div class="thread-play">
		<header class="play-header">
			<button type="button" class="back-btn" onclick={handleBack} aria-label="Back to learning paths">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7" />
				</svg>
			</button>
			<div class="header-info">
				<h2>Read the metrics</h2>
				<p class="sub">
					Case {scenario.id} of {metricsLiteracyScenarios.length} · Question {questionIndex + 1} of {scenario.questions.length}
				</p>
			</div>
		</header>

		<div class="play-content">
			<aside class="metrics-sidebar">
				<EvmsMetricsDashboard {metrics} bac={scenario.bac} />
			</aside>
			<main class="main-panel">
				<div class="case-card">
					<h3>{scenario.title}</h3>
					<p class="subtitle">{scenario.subtitle}</p>
					<p class="narrative">{scenario.narrative}</p>
				</div>
				<article class="question-card">
					{#if question.managerQuote}
						<blockquote class="manager-quote">
							<span class="quote-label">Program manager says</span>
							{question.managerQuote}
						</blockquote>
					{/if}
					<p class="prompt">{question.prompt}</p>
					<div class="options">
						{#each question.options as label, i}
							<button
								type="button"
								class="option"
								class:selected={picked === i}
								class:correct={showFeedback && i === question.correctIndex}
								class:wrong={showFeedback && picked === i && i !== question.correctIndex}
								onclick={() => pickOption(i)}
								disabled={showFeedback}
							>
								{label}
							</button>
						{/each}
					</div>
					{#if showFeedback}
						<p class="explain" role="status">{question.explanation}</p>
					{/if}
					<div class="actions">
						<button type="button" class="primary-btn" onclick={checkAnswer} disabled={picked == null || showFeedback}>
							Check answer
						</button>
						<button type="button" class="secondary-btn" onclick={advance} disabled={!showFeedback}>
							{atLastQuestion && atLastScenario ? 'Finish' : atLastQuestion ? 'Next case' : 'Next question'}
						</button>
					</div>
				</article>
			</main>
		</div>
	</div>
{/if}

<style>
	.thread-play {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		min-height: 50vh;
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
		border: 1px solid var(--border);
		background: var(--surface-2);
		color: var(--text-1);
		cursor: pointer;
	}

	.back-btn:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.header-info h2 {
		margin: 0;
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--text-1);
	}

	.sub {
		margin: var(--space-1) 0 0;
		font-size: var(--text-sm);
		color: var(--text-2);
	}

	.play-content {
		display: grid;
		grid-template-columns: minmax(260px, 320px) 1fr;
		gap: var(--space-5);
		align-items: start;
	}

	@media (max-width: 900px) {
		.play-content {
			grid-template-columns: 1fr;
		}
	}

	.metrics-sidebar {
		position: sticky;
		top: var(--space-4);
	}

	.case-card {
		background: var(--surface-2);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
		margin-bottom: var(--space-4);
	}

	.case-card h3 {
		margin: 0 0 var(--space-1);
		font-size: var(--text-lg);
		color: var(--text-1);
	}

	.subtitle {
		margin: 0 0 var(--space-3);
		font-size: var(--text-sm);
		color: var(--accent);
		font-weight: 600;
	}

	.narrative {
		margin: 0;
		font-size: var(--text-sm);
		line-height: 1.6;
		color: var(--text-2);
	}

	.question-card {
		background: var(--surface-2);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
	}

	.manager-quote {
		margin: 0 0 var(--space-4);
		padding: var(--space-3) var(--space-4);
		border-left: 4px solid var(--warning);
		background: rgba(245, 158, 11, 0.08);
		font-size: var(--text-sm);
		line-height: 1.55;
		color: var(--text-1);
		font-style: italic;
	}

	.quote-label {
		display: block;
		font-style: normal;
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-3);
		margin-bottom: var(--space-2);
	}

	.prompt {
		margin: 0 0 var(--space-4);
		font-size: var(--text-base);
		font-weight: 600;
		line-height: 1.5;
		color: var(--text-1);
	}

	.options {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		margin-bottom: var(--space-4);
	}

	.option {
		text-align: left;
		padding: var(--space-3);
		border-radius: var(--radius);
		border: 2px solid var(--border);
		background: var(--surface-1);
		font-size: var(--text-sm);
		color: var(--text-1);
		cursor: pointer;
	}

	.option:hover:not(:disabled) {
		border-color: var(--accent);
	}

	.option.selected:not(.correct):not(.wrong) {
		border-color: var(--accent);
		background: var(--accent-muted);
	}

	.option.correct {
		border-color: var(--success);
		background: var(--success-muted);
	}

	.option.wrong {
		border-color: var(--danger);
		background: rgba(220, 38, 38, 0.08);
	}

	.explain {
		margin: 0 0 var(--space-4);
		font-size: var(--text-sm);
		line-height: 1.55;
		color: var(--text-2);
		padding: var(--space-3);
		background: var(--surface-1);
		border-radius: var(--radius);
		border-left: 3px solid #0d9488;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
	}

	.primary-btn,
	.secondary-btn {
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius);
		font-size: var(--text-sm);
		font-weight: 600;
		cursor: pointer;
		border: none;
	}

	.primary-btn {
		background: var(--accent);
		color: white;
	}

	.primary-btn:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.secondary-btn {
		background: transparent;
		border: 1px solid var(--border);
		color: var(--text-2);
	}

	.secondary-btn:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}
</style>
