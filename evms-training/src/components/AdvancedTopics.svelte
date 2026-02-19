<script>
	import { ADVANCED_TOPICS } from '../lib/advanced-topics/index.js';

	let { onBack } = $props();
</script>

<div class="advanced-container">
	<header class="advanced-header">
		<button class="back-btn" onclick={onBack} aria-label="Back to scenarios">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
		</button>
		<div>
			<h2>Advanced Topics</h2>
			<p class="subtitle">When EVMS May Not Be the Best Fit</p>
		</div>
	</header>

	<div class="intro">
		<p>
			EVMS excels when you have a defined baseline, discrete deliverables, and a clear end state.
			These scenarios often benefit from <strong>alternative approaches</strong> to tracking.
			Understanding when <em>not</em> to use EVMS is part of mastery.
		</p>
	</div>

	<div class="topics-list">
		{#each ADVANCED_TOPICS as topic}
			<article class="topic-card">
				<h3>{topic.title}</h3>
				<p class="topic-subtitle">{topic.subtitle}</p>
				<section class="topic-body">
					<div class="topic-block">
						<h4>Why EVMS Fits Poorly</h4>
						<p>{topic.whyNotEVM}</p>
					</div>
					<div class="topic-block">
						<h4>Better Approaches</h4>
						<p>{topic.betterApproach}</p>
					</div>
					<div class="topic-refs">
						<h4>Further Reading</h4>
						<ul>
							{#each topic.references as ref}
								<li>
									<a href={ref.url} target="_blank" rel="noopener noreferrer">
										{ref.title}
									</a>
									{#if ref.note}
										<span class="ref-note">— {ref.note}</span>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				</section>
			</article>
		{/each}
	</div>
</div>

<style>
	.advanced-container {
		max-width: 720px;
		margin: 0 auto;
	}

	.advanced-header {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
		padding-bottom: var(--space-4);
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
		flex-shrink: 0;
	}

	.back-btn:hover {
		background: var(--surface-3);
		color: var(--text-1);
	}

	.advanced-header h2 {
		margin: 0;
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--text-1);
	}

	.subtitle {
		margin: var(--space-1) 0 0;
		font-size: var(--text-base);
		color: var(--text-2);
	}

	.intro {
		background: var(--accent-muted);
		border-radius: var(--radius);
		padding: var(--space-4);
		margin-bottom: var(--space-6);
		border-left: 4px solid var(--accent);
	}

	.intro p {
		margin: 0;
		color: var(--text-1);
		line-height: 1.6;
		font-size: var(--text-sm);
	}

	.topics-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.topic-card {
		background: var(--surface-2);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
		border: 1px solid var(--border);
	}

	.topic-card h3 {
		margin: 0 0 var(--space-1);
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--text-1);
	}

	.topic-subtitle {
		margin: 0 0 var(--space-4);
		font-size: var(--text-sm);
		color: var(--text-2);
		font-style: italic;
	}

	.topic-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.topic-block h4,
	.topic-refs h4 {
		margin: 0 0 var(--space-2);
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--accent);
	}

	.topic-block p {
		margin: 0;
		font-size: var(--text-sm);
		line-height: 1.6;
		color: var(--text-2);
	}

	.topic-refs ul {
		margin: 0;
		padding-left: var(--space-5);
	}

	.topic-refs li {
		margin-bottom: var(--space-2);
		font-size: var(--text-sm);
		line-height: 1.5;
	}

	.topic-refs a {
		color: var(--accent);
		text-decoration: none;
	}

	.topic-refs a:hover {
		text-decoration: underline;
	}

	.ref-note {
		display: block;
		margin-top: var(--space-1);
		font-size: var(--text-xs);
		color: var(--text-3);
	}
</style>
