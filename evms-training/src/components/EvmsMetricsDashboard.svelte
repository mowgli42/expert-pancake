<script>
	import { formatCurrency, getPerformanceIndicator } from '../lib/evms/calculations.js';

	let { metrics = null, bac = 0, compact = false } = $props();

	const metricRows = [
		{ key: 'pv', label: 'Planned Value', full: 'PV' },
		{ key: 'ev', label: 'Earned Value', full: 'EV' },
		{ key: 'ac', label: 'Actual Cost', full: 'AC' },
		{ key: 'bac', label: 'Budget at Completion', full: 'BAC' },
		{ key: 'eac', label: 'Estimate at Completion', full: 'EAC' },
		{ key: 'etc', label: 'Estimate to Complete', full: 'ETC' },
		{ key: 'sv', label: 'Schedule Variance', full: 'SV', isVariance: true },
		{ key: 'cv', label: 'Cost Variance', full: 'CV', isVariance: true },
		{ key: 'spi', label: 'Schedule Perf. Index', full: 'SPI', isIndex: true },
		{ key: 'cpi', label: 'Cost Perf. Index', full: 'CPI', isIndex: true },
		{ key: 'vac', label: 'Variance at Completion', full: 'VAC', isVariance: true }
	];
</script>

<div class="dashboard" class:compact>
	<div class="header">
		<h3>EVMS Metrics</h3>
		{#if bac > 0}
			<span class="bac-badge">BAC: {formatCurrency(bac)}</span>
		{/if}
	</div>

	{#if metrics}
		<div class="metrics-grid">
			{#each metricRows.filter((r) => !compact || ['pv', 'ev', 'ac', 'bac', 'sv', 'cv', 'spi', 'cpi'].includes(r.key)) as row}
				{@const value = metrics[row.key]}
				{@const indicator = row.isIndex ? getPerformanceIndicator(value) : row.isVariance && value != null ? (value >= 0 ? 'good' : 'bad') : null}
				<div class="metric" data-indicator={indicator}>
					<span class="label">{row.full}</span>
					<span class="value">
						{#if row.isIndex}
							{value?.toFixed(2) ?? '—'}
						{:else}
							{value != null ? formatCurrency(value) : '—'}
						{/if}
					</span>
				</div>
			{/each}
		</div>
	{:else}
		<p class="empty">Start a scenario to see metrics</p>
	{/if}
</div>

<style>
	.dashboard {
		background: var(--surface-2);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
		border: 1px solid var(--border);
	}

	.dashboard.compact {
		padding: var(--space-3);
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--space-3);
		gap: var(--space-2);
	}

	.header h3 {
		margin: 0;
		font-size: var(--text-sm);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-2);
	}

	.bac-badge {
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--accent);
		background: var(--accent-muted);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius);
	}

	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: var(--space-2);
	}

	.dashboard.compact .metrics-grid {
		grid-template-columns: repeat(4, 1fr);
	}

	.metric {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		padding: var(--space-2);
		background: var(--surface-1);
		border-radius: var(--radius);
		border-left: 3px solid var(--border);
		transition: border-color 0.2s;
	}

	.metric[data-indicator='good'] {
		border-left-color: var(--success);
	}

	.metric[data-indicator='warning'] {
		border-left-color: var(--warning);
	}

	.metric[data-indicator='bad'] {
		border-left-color: var(--danger);
	}

	.label {
		font-size: var(--text-xs);
		color: var(--text-2);
		font-weight: 500;
	}

	.value {
		font-size: var(--text-sm);
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		color: var(--text-1);
	}

	.empty {
		color: var(--text-2);
		font-size: var(--text-sm);
		margin: 0;
		padding: var(--space-4);
		text-align: center;
	}
</style>
