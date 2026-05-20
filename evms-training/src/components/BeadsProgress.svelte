<script>
	let { beads = [], completedCount = 0, totalCount = 10 } = $props();
</script>

<div class="beads-container" role="group" aria-label="Scenario progress: {completedCount} of {totalCount} completed">
	<div class="beads-header">
		<span class="title" id="beads-progress-label">Progress</span>
		<span class="count" aria-live="polite">{completedCount}/{totalCount} scenarios</span>
	</div>
	<ol class="beads-track" aria-labelledby="beads-progress-label">
		{#each beads as bead, i}
			<li class="bead-item">
				<div
					class="bead"
					class:unlocked={bead.unlocked}
					class:completed={bead.completed}
					class:current={i === completedCount && bead.unlocked}
					aria-label="{bead.name}, difficulty {bead.difficulty}{bead.completed ? ', completed' : bead.unlocked ? ', unlocked' : ', locked'}"
				>
					<span class="bead-inner" aria-hidden="true">
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
					<span class="connector" class:active={bead.completed} aria-hidden="true"></span>
				{/if}
			</li>
		{/each}
	</ol>
</div>

<style>
	.beads-container {
		background: rgba(255, 255, 255, 0.12);
		border-radius: var(--radius-lg);
		padding: var(--space-3);
		border: 1px solid rgba(255, 255, 255, 0.25);
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
		color: rgba(255, 255, 255, 0.95);
	}

	.count {
		font-size: var(--text-xs);
		color: rgba(255, 255, 255, 0.85);
		font-variant-numeric: tabular-nums;
	}

	.beads-track {
		display: flex;
		align-items: center;
		gap: 0;
		overflow-x: auto;
		padding: var(--space-1) 0;
		margin: 0;
		list-style: none;
		-webkit-overflow-scrolling: touch;
	}

	.bead-item {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.bead {
		flex-shrink: 0;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		border: 2px solid rgba(255, 255, 255, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.bead-inner {
		font-size: 10px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bead.unlocked {
		background: rgba(255, 255, 255, 0.35);
		border-color: #fff;
	}

	.bead.completed {
		background: var(--success);
		border-color: #fff;
	}

	.bead.completed .bead-inner {
		color: #fff;
	}

	.bead.current {
		box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.35);
	}

	.connector {
		width: 12px;
		height: 2px;
		background: rgba(255, 255, 255, 0.35);
		flex-shrink: 0;
		display: block;
	}

	.connector.active {
		background: var(--success);
	}
</style>
