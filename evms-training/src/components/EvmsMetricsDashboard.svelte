<script>
	import { formatCurrency, getPerformanceIndicator } from '../lib/evms/calculations.js';

	let { metrics = null, bac = 0, compact = false } = $props();

	const ALL_METRIC_ROWS = [
		{ key: 'pv', full: 'PV' },
		{ key: 'ev', full: 'EV' },
		{ key: 'ac', full: 'AC' },
		{ key: 'bac', full: 'BAC' },
		{ key: 'eac', full: 'EAC' },
		{ key: 'etc', full: 'ETC' },
		{ key: 'sv', full: 'SV', isVariance: true },
		{ key: 'cv', full: 'CV', isVariance: true },
		{ key: 'spi', full: 'SPI', isIndex: true },
		{ key: 'cpi', full: 'CPI', isIndex: true },
		{ key: 'vac', full: 'VAC', isVariance: true }
	];

	const COMPACT_KEYS = ['pv', 'ev', 'ac', 'bac', 'sv', 'cv', 'spi', 'cpi'];

	const metricRows = $derived(
		compact ? ALL_METRIC_ROWS.filter((r) => COMPACT_KEYS.includes(r.key)) : ALL_METRIC_ROWS
	);

	function getIndicator(row, value) {
		if (row.isIndex) return getPerformanceIndicator(value);
		if (row.isVariance && value != null) return value >= 0 ? 'good' : 'bad';
		return null;
	}

	function formatValue(row, value) {
		if (value == null) return '—';
		if (row.isIndex) return value.toFixed(2);
		return formatCurrency(value);
	}
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
			{#each metricRows as row}
				{@const value = metrics[row.key]}
				<div class="metric" data-indicator={getIndicator(row, value)}>
					<span class="label">{row.full}</span>
					<span class="value">{formatValue(row, value)}</span>
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
