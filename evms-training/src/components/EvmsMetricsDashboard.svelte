<script>
	import { formatCurrency, getPerformanceIndicator } from '../lib/evms/calculations.js';

	let { metrics = null, bac = 0, compact = false, compactOnNarrow = false } = $props();

	const ALL_METRIC_ROWS = [
		{ key: 'pv', full: 'PV', label: 'Planned Value' },
		{ key: 'ev', full: 'EV', label: 'Earned Value' },
		{ key: 'ac', full: 'AC', label: 'Actual Cost' },
		{ key: 'bac', full: 'BAC', label: 'Budget at Completion' },
		{ key: 'eac', full: 'EAC', label: 'Estimate at Completion' },
		{ key: 'etc', full: 'ETC', label: 'Estimate to Complete' },
		{
			key: 'sv',
			full: 'SV ($)',
			label: 'Schedule Variance',
			isVariance: true,
			help: 'SV = EV − PV in budget dollars (ANSI-748). SPI is the unitless schedule index (EV ÷ PV).'
		},
		{
			key: 'cv',
			full: 'CV ($)',
			label: 'Cost Variance',
			isVariance: true,
			help: 'CV = EV − AC in budget dollars (cost variance for work performed).'
		},
		{ key: 'spi', full: 'SPI', label: 'Schedule Performance Index', isIndex: true, help: 'Schedule performance index: EV divided by PV.' },
		{ key: 'cpi', full: 'CPI', label: 'Cost Performance Index', isIndex: true, help: 'Cost performance index: EV divided by AC.' },
		{
			key: 'vac',
			full: 'VAC',
			label: 'Variance at Completion',
			isVariance: true,
			help: 'Variance at completion: BAC minus EAC (forecast budget surplus or shortfall).'
		}
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

<section
	class="dashboard"
	class:compact
	class:narrow-compact={compactOnNarrow}
	aria-label="EVMS metrics dashboard"
>
	<div class="header">
		<h3 id="evms-metrics-heading">EVMS Metrics</h3>
		{#if bac > 0}
			<span class="bac-badge" aria-label="Budget at completion {formatCurrency(bac)}">BAC: {formatCurrency(bac)}</span>
		{/if}
	</div>

	{#if metrics}
		<div class="metrics-grid" role="list" aria-labelledby="evms-metrics-heading">
			{#each metricRows as row}
				{@const value = metrics[row.key]}
				{@const indicator = getIndicator(row, value)}
				<div
					class="metric"
					role="listitem"
					data-indicator={indicator}
					aria-label="{row.label}: {formatValue(row, value)}"
				>
					<span class="label" title={row.help || undefined}>{row.full}</span>
					<span class="value" aria-hidden="true">{formatValue(row, value)}</span>
					{#if row.help}
						<span class="sr-only">{row.help}</span>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<p class="empty">Start a scenario to see metrics</p>
	{/if}
</section>

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
		flex-wrap: wrap;
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
		color: var(--accent-dark);
		background: var(--accent-muted);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius);
	}

	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
		gap: var(--space-2);
	}

	.dashboard.compact .metrics-grid,
	.dashboard.narrow-compact .metrics-grid {
		grid-template-columns: repeat(4, 1fr);
	}

	@media (max-width: 480px) {
		.dashboard.narrow-compact .metrics-grid {
			grid-template-columns: repeat(2, 1fr);
		}
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
		font-weight: 600;
	}

	.value {
		font-size: var(--text-sm);
		font-weight: 700;
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
