<script>
	import { learningThreads } from '../lib/threads/index.js';

	let { onSelectThread } = $props();
</script>

<section class="thread-picker" aria-labelledby="threads-heading">
	<div class="section-header">
		<h2 id="threads-heading">Choose a learning path</h2>
		<p class="section-desc">
			Recommended order on this page: EVMS 101 first, then Read the metrics (twelve cases), then Project scenarios for
			hands-on narratives.
		</p>
	</div>
	<div class="thread-cards">
		{#each learningThreads as thread (thread.id)}
			<button
				type="button"
				class="thread-card"
				class:variant-projects={thread.variant === 'projects'}
				class:variant-academic={thread.variant === 'academic'}
				class:variant-metrics={thread.variant === 'metrics'}
				onclick={() => onSelectThread?.(thread.id)}
				aria-label="Learning path: {thread.title} — {thread.subtitle}"
			>
				<span class="pill">{thread.subtitle}</span>
				<h3 class="thread-title">{thread.title}</h3>
				<p class="thread-desc">{thread.description}</p>
				<span class="cta">Open</span>
			</button>
		{/each}
	</div>
</section>

<style>
	.thread-picker {
		margin-bottom: var(--space-6);
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
		max-width: 65ch;
	}

	.thread-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-4);
	}

	.thread-card {
		position: relative;
		text-align: left;
		padding: var(--space-5);
		border-radius: var(--radius-lg);
		border: 2px solid var(--border);
		background: var(--surface-2);
		cursor: pointer;
		transition:
			border-color 0.2s,
			box-shadow 0.2s,
			transform 0.2s;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		min-height: 200px;
	}

	.thread-card:hover {
		border-color: var(--accent);
		box-shadow: var(--shadow-md);
		transform: translateY(-2px);
	}

	.thread-card.variant-projects {
		border-left: 4px solid var(--accent);
	}

	.thread-card.variant-academic {
		border-left: 4px solid #6366f1;
	}

	.thread-card.variant-metrics {
		border-left: 4px solid #0d9488;
	}

	.pill {
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--text-3);
	}

	.thread-title {
		margin: 0;
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--text-1);
	}

	.thread-desc {
		margin: 0;
		flex: 1;
		font-size: var(--text-sm);
		color: var(--text-2);
		line-height: 1.55;
	}

	.cta {
		margin-top: var(--space-2);
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--accent);
	}
</style>
