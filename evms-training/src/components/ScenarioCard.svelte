<script>
	let {
		scenario,
		unlocked = false,
		completed = false,
		onSelect
	} = $props();
</script>

<button
	class="card"
	class:unlocked
	class:completed
	class:locked={!unlocked}
	onclick={() => unlocked && onSelect?.()}
	disabled={!unlocked}
	aria-disabled={!unlocked}
>
	<div class="difficulty">Level {scenario.difficulty}</div>
	<h4 class="title">{scenario.title}</h4>
	<p class="subtitle">{scenario.subtitle}</p>
	<div class="meta">
		<span>BAC: ${scenario.bac.toLocaleString()}</span>
		<span>•</span>
		<span>{scenario.duration}</span>
	</div>
	{#if completed}
		<span class="badge completed">Complete</span>
	{:else if !unlocked}
		<span class="badge locked">Locked</span>
	{/if}
</button>

<style>
	.card {
		position: relative;
		text-align: left;
		padding: var(--space-4);
		background: var(--surface-2);
		border: 2px solid var(--border);
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all 0.2s ease;
		width: 100%;
	}

	.card:hover:not(:disabled) {
		border-color: var(--accent);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.card:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}

	.card.locked {
		filter: grayscale(0.3);
	}

	.card.completed {
		border-color: var(--success);
		background: var(--success-muted);
	}

	.difficulty {
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--accent);
		margin-bottom: var(--space-1);
	}

	.title {
		margin: 0 0 var(--space-1);
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--text-1);
	}

	.subtitle {
		margin: 0 0 var(--space-2);
		font-size: var(--text-sm);
		color: var(--text-2);
		line-height: 1.4;
	}

	.meta {
		font-size: var(--text-xs);
		color: var(--text-3);
		display: flex;
		gap: var(--space-2);
		flex-wrap: wrap;
	}

	.badge {
		position: absolute;
		top: var(--space-3);
		right: var(--space-3);
		font-size: var(--text-xs);
		font-weight: 600;
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius);
	}

	.badge.completed {
		background: var(--success);
		color: white;
	}

	.badge.locked {
		background: var(--surface-3);
		color: var(--text-3);
	}
</style>
