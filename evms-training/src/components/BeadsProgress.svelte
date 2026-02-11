<script>
	let { beads = [], completedCount = 0, totalCount = 10 } = $props();
</script>

<div class="beads-container">
	<div class="beads-header">
		<span class="title">Progress</span>
		<span class="count">{completedCount}/{totalCount} scenarios</span>
	</div>
	<div class="beads-track">
		{#each beads as bead, i}
			<div
				class="bead"
				class:unlocked={bead.unlocked}
				class:completed={bead.completed}
				class:current={i === completedCount && bead.unlocked}
				title="{bead.name} (Difficulty {bead.difficulty})"
			>
				<span class="bead-inner">
					{#if bead.completed}
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
					{:else}
						{i + 1}
					{/if}
				</span>
			</div>
			{#if i < beads.length - 1}
				<div class="connector" class:active={bead.completed}></div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.beads-container {
		background: var(--surface-2);
		border-radius: var(--radius-lg);
		padding: var(--space-3);
		border: 1px solid var(--border);
	}

	.beads-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-2);
	}

	.title {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--text-2);
	}

	.count {
		font-size: var(--text-xs);
		color: var(--text-3);
		font-variant-numeric: tabular-nums;
	}

	.beads-track {
		display: flex;
		align-items: center;
		gap: 0;
		overflow-x: auto;
		padding: var(--space-1) 0;
	}

	.bead {
		flex-shrink: 0;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: var(--surface-3);
		border: 2px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.bead-inner {
		font-size: 10px;
		font-weight: 700;
		color: var(--text-3);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bead.unlocked {
		background: var(--accent-muted);
		border-color: var(--accent);
	}

	.bead.unlocked .bead-inner {
		color: var(--accent);
	}

	.bead.completed {
		background: var(--success-muted);
		border-color: var(--success);
	}

	.bead.completed .bead-inner {
		color: var(--success);
	}

	.bead.current {
		box-shadow: 0 0 0 3px var(--accent-muted);
	}

	.connector {
		width: 12px;
		height: 2px;
		background: var(--border);
		flex-shrink: 0;
		transition: background 0.2s;
	}

	.connector.active {
		background: var(--success);
	}
</style>
