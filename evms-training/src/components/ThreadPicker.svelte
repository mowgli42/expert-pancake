<script>
	import { learningThreads, PDU_DISCLAIMER } from '../lib/threads/index.js';

	let { onSelectThread } = $props();
</script>

<section class="thread-picker" aria-labelledby="threads-heading">
	<div class="section-header">
		<h2 id="threads-heading">Choose a learning path</h2>
		<p class="section-desc">
			Recommended order: EVMS 101 first (45–60 min), then Read the metrics (2–3 hours), then Project scenarios
			(4–6 hours for all ten). Content aligns with EIA-748 (ANSI-748) intent and the PMI Practice Standard for
			Earned Value Management.
		</p>
		<p class="pdu-disclaimer" role="note">{PDU_DISCLAIMER}</p>
	</div>
	<div class="thread-cards" role="list">
		{#each learningThreads as thread (thread.id)}
			<article class="thread-card-wrap" role="listitem">
				<button
					type="button"
					class="thread-card"
					class:variant-projects={thread.variant === 'projects'}
					class:variant-academic={thread.variant === 'academic'}
					class:variant-metrics={thread.variant === 'metrics'}
					onclick={() => onSelectThread?.(thread.id)}
					aria-label="Learning path: {thread.title} — {thread.subtitle}, estimated {thread.estimatedTime}"
				>
					<span class="pill">{thread.subtitle}</span>
					<span class="time-estimate" aria-hidden="true">{thread.estimatedTime}</span>
					<h3 class="thread-title">{thread.title}</h3>
					<p class="thread-desc">{thread.description}</p>
					{#if thread.teaserExamples?.length}
						<ul class="teasers" aria-label="Example activities in this path">
							{#each thread.teaserExamples as example}
								<li>{example}</li>
							{/each}
						</ul>
					{/if}
					{#if thread.learningObjectives?.length}
						<div class="objectives" aria-label="Learning objectives">
							<span class="obj-label">You will:</span>
							<ul>
								{#each thread.learningObjectives as obj}
									<li>{obj}</li>
								{/each}
							</ul>
						</div>
					{/if}
					<span class="cta">Open path</span>
				</button>
			</article>
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
		margin: 0 0 var(--space-3);
		font-size: var(--text-base);
		color: var(--text-2);
		line-height: 1.6;
		max-width: 65ch;
	}

	.pdu-disclaimer {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--text-3);
		line-height: 1.5;
		max-width: 65ch;
		padding: var(--space-3);
		background: var(--surface-2);
		border-left: 3px solid var(--accent);
		border-radius: var(--radius);
	}

	.thread-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
		gap: var(--space-4);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.thread-card-wrap {
		margin: 0;
		padding: 0;
	}

	.thread-card {
		width: 100%;
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

	@media (prefers-reduced-motion: reduce) {
		.thread-card {
			transition: border-color 0.2s;
		}
		.thread-card:hover {
			transform: none;
		}
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

	.time-estimate {
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--accent);
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

	.teasers {
		margin: 0;
		padding-left: 1.1rem;
		font-size: var(--text-xs);
		color: var(--text-3);
		line-height: 1.45;
	}

	.teasers li {
		margin-bottom: var(--space-1);
	}

	.objectives {
		font-size: var(--text-xs);
		color: var(--text-2);
	}

	.obj-label {
		font-weight: 700;
		display: block;
		margin-bottom: var(--space-1);
	}

	.objectives ul {
		margin: 0;
		padding-left: 1.1rem;
		line-height: 1.45;
	}

	.cta {
		margin-top: var(--space-2);
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--accent);
	}
</style>
