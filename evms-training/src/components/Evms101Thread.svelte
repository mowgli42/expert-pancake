<script>
	import {
		evms101ExternalResources,
		evms101Lessons,
		evms101Quiz
	} from '../lib/threads/evms101Content.js';
	import { THREAD_IDS } from '../lib/threads/index.js';
	import { trackQuizCompleted } from '../lib/analytics.js';

	let { onBack, progressStore = null } = $props();

	let CertificatePanel = $state(null);

	let phase = $state('lessons');
	let lessonIndex = $state(0);
	let quizIndex = $state(0);
	let picked = $state(null);
	let showQuizFeedback = $state(false);
	let correctCount = $state(0);

	const totalLessons = evms101Lessons.length;
	const totalQuiz = evms101Quiz.length;
	const lesson = $derived(evms101Lessons[lessonIndex]);
	const quizItem = $derived(evms101Quiz[quizIndex]);

	function goLessonsPrev() {
		lessonIndex = Math.max(0, lessonIndex - 1);
	}

	function goLessonsNext() {
		if (lessonIndex >= totalLessons - 1) {
			phase = 'quiz';
			quizIndex = 0;
			picked = null;
			showQuizFeedback = false;
			correctCount = 0;
			return;
		}
		lessonIndex += 1;
	}

	function pickOption(i) {
		if (showQuizFeedback) return;
		picked = i;
	}

	function checkAnswer() {
		if (picked == null || showQuizFeedback) return;
		showQuizFeedback = true;
		if (picked === quizItem.correctIndex) {
			correctCount += 1;
		}
	}

	async function loadCertificatePanel() {
		if (!CertificatePanel) {
			CertificatePanel = (await import('./CertificatePanel.svelte')).default;
		}
	}

	function nextQuiz() {
		if (!showQuizFeedback) return;
		if (quizIndex >= totalQuiz - 1) {
			phase = 'results';
			trackQuizCompleted(THREAD_IDS.evms101, correctCount, totalQuiz);
			progressStore?.saveEvms101({
				quizComplete: true,
				quizScore: correctCount,
				quizTotal: totalQuiz
			});
			loadCertificatePanel();
			return;
		}
		quizIndex += 1;
		picked = null;
		showQuizFeedback = false;
	}

	function restartFromTop() {
		phase = 'lessons';
		lessonIndex = 0;
		quizIndex = 0;
		picked = null;
		showQuizFeedback = false;
		correctCount = 0;
	}

	function handleBack() {
		restartFromTop();
		onBack?.();
	}
</script>

<div class="thread-play">
	<header class="play-header">
		<button type="button" class="back-btn" onclick={handleBack} aria-label="Back to learning paths">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7" />
			</svg>
		</button>
		<div class="header-info">
			<h2>EVMS 101</h2>
			<p class="sub">
				{#if phase === 'lessons'}
					Lesson {lessonIndex + 1} of {totalLessons}
				{:else if phase === 'quiz'}
					Quiz question {quizIndex + 1} of {totalQuiz}
				{:else}
					Quiz complete
				{/if}
			</p>
		</div>
	</header>

	{#if phase === 'lessons' && lesson}
		<article class="card lesson-card">
			<h3>{lesson.title}</h3>
			<p class="lesson-body">{@html lesson.body}</p>
			{#if lesson.showResources}
				<section class="resources" aria-labelledby="evms101-res-title">
					<h4 id="evms101-res-title">Further reading</h4>
					<ul>
						{#each evms101ExternalResources as link}
							<li>
								<a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
								{#if link.note}
									<span class="res-note"> — {link.note}</span>
								{/if}
							</li>
						{/each}
					</ul>
				</section>
			{/if}
			<div class="nav-row">
				<button type="button" class="secondary-btn" onclick={goLessonsPrev} disabled={lessonIndex === 0}>
					Previous
				</button>
				<button type="button" class="primary-btn" onclick={goLessonsNext}>
					{lessonIndex >= totalLessons - 1 ? 'Start quiz' : 'Next'}
				</button>
			</div>
		</article>
	{:else if phase === 'quiz' && quizItem}
		<div class="quiz-layout">
			<article class="card">
				<p class="prompt">{quizItem.prompt}</p>
				<div class="options" role="radiogroup" aria-labelledby="quiz-q-{quizItem.id}">
					<span id="quiz-q-{quizItem.id}" class="sr-only">Select one answer</span>
					{#each quizItem.options as label, i}
						<button
							type="button"
							class="option"
							role="radio"
							aria-checked={picked === i}
							class:selected={picked === i}
							class:correct={showQuizFeedback && i === quizItem.correctIndex}
							class:wrong={showQuizFeedback && picked === i && i !== quizItem.correctIndex}
							onclick={() => pickOption(i)}
							disabled={showQuizFeedback}
						>
							{label}
						</button>
					{/each}
				</div>
				{#if showQuizFeedback}
					<p class="explain" role="status">{quizItem.explanation}</p>
				{/if}
				<div class="nav-row">
					<button type="button" class="primary-btn" onclick={checkAnswer} disabled={picked == null || showQuizFeedback}>
						Check answer
					</button>
					<button type="button" class="secondary-btn" onclick={nextQuiz} disabled={!showQuizFeedback}>
						{quizIndex >= totalQuiz - 1 ? 'See results' : 'Next question'}
					</button>
				</div>
			</article>
		</div>
	{:else if phase === 'results'}
		<article class="card results-card">
			<h3>Quiz results</h3>
			<p class="score">
				You answered <strong>{correctCount}</strong> of <strong>{totalQuiz}</strong> correctly.
			</p>
			{#if correctCount === totalQuiz}
				<p class="blurb">
					Solid grasp of the core definitions—next try <strong>Read the metrics</strong> for twelve short cases, then the
					<strong>Project scenarios</strong> path.
				</p>
			{:else if correctCount >= totalQuiz * 0.75}
				<p class="blurb">Good work. Skim the lesson cards for any questions you missed, then try again anytime.</p>
			{:else}
				<p class="blurb">Review the lesson cards and retry the quiz when ready—the terms pay off quickly with repetition.</p>
			{/if}
			<section class="resources results-resources" aria-labelledby="evms101-res-quiz-title">
				<h4 id="evms101-res-quiz-title">Further reading</h4>
				<ul>
					{#each evms101ExternalResources as link}
						<li>
							<a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
							{#if link.note}
								<span class="res-note"> — {link.note}</span>
							{/if}
						</li>
					{/each}
				</ul>
			</section>
			{#if CertificatePanel}
				<CertificatePanel
					pathId={THREAD_IDS.evms101}
					pathTitle="EVMS 101 — Terms, contrast & quiz"
					hoursEstimate="0.75–1.0"
				/>
			{/if}
			<div class="nav-row">
				<button type="button" class="secondary-btn" onclick={restartFromTop}>Review lessons</button>
				<button type="button" class="primary-btn" onclick={handleBack}>Learning paths</button>
			</div>
		</article>
	{/if}
</div>

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

	.card {
		background: var(--surface-2);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
		max-width: 720px;
	}

	.lesson-card h3 {
		margin: 0 0 var(--space-3);
		font-size: var(--text-lg);
		color: var(--text-1);
	}

	.lesson-body {
		margin: 0 0 var(--space-5);
		font-size: var(--text-base);
		line-height: 1.65;
		color: var(--text-2);
	}

	.lesson-body :global(strong) {
		color: var(--text-1);
	}

	.resources {
		margin: 0 0 var(--space-5);
		padding: var(--space-4);
		background: var(--surface-1);
		border-radius: var(--radius);
		border: 1px solid var(--border);
	}

	.resources h4 {
		margin: 0 0 var(--space-2);
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--text-1);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.resources ul {
		margin: 0;
		padding-left: 1.25rem;
		color: var(--text-2);
		font-size: var(--text-sm);
		line-height: 1.55;
	}

	.resources a {
		color: var(--accent);
		font-weight: 600;
	}

	.resources a:hover {
		text-decoration: underline;
	}

	.res-note {
		font-weight: 400;
		color: var(--text-3);
	}

	.results-resources {
		margin-bottom: var(--space-5);
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
		transition:
			border-color 0.15s,
			background 0.15s;
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
		border-left: 3px solid var(--accent);
	}

	.nav-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		align-items: center;
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

	.primary-btn:hover:not(:disabled) {
		filter: brightness(1.05);
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

	.secondary-btn:hover:not(:disabled) {
		border-color: var(--accent);
		color: var(--accent);
	}

	.secondary-btn:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.results-card h3 {
		margin: 0 0 var(--space-2);
	}

	.score {
		font-size: var(--text-lg);
		color: var(--text-1);
		margin: 0 0 var(--space-3);
	}

	.blurb {
		margin: 0 0 var(--space-5);
		color: var(--text-2);
		line-height: 1.55;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
