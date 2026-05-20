'use client';

import { formatCurrency, getPerformanceIndicator } from '@/lib/evms/calculations';

type Metrics = Record<string, number> | null;

const ALL_ROWS = [
	{ key: 'pv', full: 'PV' },
	{ key: 'ev', full: 'EV' },
	{ key: 'ac', full: 'AC' },
	{ key: 'bac', full: 'BAC' },
	{ key: 'eac', full: 'EAC' },
	{ key: 'etc', full: 'ETC' },
	{
		key: 'sv',
		full: 'SV ($)',
		isVariance: true,
		help: 'SV = EV − PV in budget dollars (ANSI-748). SPI is the unitless schedule index (EV ÷ PV).'
	},
	{
		key: 'cv',
		full: 'CV ($)',
		isVariance: true,
		help: 'CV = EV − AC in budget dollars (cost variance for work performed).'
	},
	{ key: 'spi', full: 'SPI', isIndex: true, help: 'Schedule performance index: EV divided by PV.' },
	{ key: 'cpi', full: 'CPI', isIndex: true, help: 'Cost performance index: EV divided by AC.' },
	{
		key: 'vac',
		full: 'VAC',
		isVariance: true,
		help: 'Variance at completion: BAC minus EAC (forecast budget surplus or shortfall).'
	}
] as const;

const COMPACT = new Set(['pv', 'ev', 'ac', 'bac', 'sv', 'cv', 'spi', 'cpi']);

function rowIndicator(row: (typeof ALL_ROWS)[number], value: number | undefined) {
	if (value == null) return null;
	if ('isIndex' in row && row.isIndex) return getPerformanceIndicator(value, 'index');
	if ('isVariance' in row && row.isVariance) return value >= 0 ? 'good' : 'bad';
	return null;
}

function formatCell(row: (typeof ALL_ROWS)[number], value: number | undefined) {
	if (value == null) return '—';
	if ('isIndex' in row && row.isIndex) return value.toFixed(2);
	return formatCurrency(value);
}

export function EvmsMetricsDashboard({
	metrics,
	bac,
	compact = false
}: {
	metrics: Metrics;
	bac: number;
	compact?: boolean;
}) {
	const rows = compact ? ALL_ROWS.filter((r) => COMPACT.has(r.key)) : [...ALL_ROWS];

	return (
		<div
			className={`rounded-xl border border-border bg-surface-2 ${compact ? 'p-3' : 'p-4'} shadow-sm`}
		>
			<div className="mb-3 flex flex-wrap items-center justify-between gap-2">
				<h3 className="m-0 text-xs font-semibold uppercase tracking-wide text-ink-2">EVMS Metrics</h3>
				{bac > 0 ? (
					<span className="rounded bg-accent-muted px-2 py-0.5 text-xs font-semibold text-accent">
						BAC: {formatCurrency(bac)}
					</span>
				) : null}
			</div>
			{metrics ? (
				<div
					className={`metrics-grid grid gap-2 ${compact ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))]'}`}
				>
					{rows.map((row) => {
						const value = metrics[row.key as keyof typeof metrics] as number | undefined;
						const ind = rowIndicator(row, value);
						return (
							<div
								key={row.key}
								title={'help' in row ? row.help : undefined}
								className={`flex flex-col gap-1 rounded border-l-[3px] border-l-border bg-surface-1 p-2 ${
									ind === 'good'
										? 'border-l-success'
										: ind === 'warning'
											? 'border-l-warning'
											: ind === 'bad'
												? 'border-l-danger'
												: ''
								}`}
							>
								<span className="text-xs font-medium text-ink-2">{row.full}</span>
								<span className="text-sm font-semibold tabular-nums text-ink-1">{formatCell(row, value)}</span>
							</div>
						);
					})}
				</div>
			) : (
				<p className="m-0 p-4 text-center text-sm text-ink-2">Start a scenario to see metrics</p>
			)}
		</div>
	);
}
