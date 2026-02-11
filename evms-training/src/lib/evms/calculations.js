/**
 * EVMS metric calculations (ANSI-748 / PMI PMBOK)
 */

export function calculateEvmsMetrics({ pv, ev, ac, bac }) {
	const sv = ev - pv;
	const cv = ev - ac;
	const spi = pv > 0 ? ev / pv : 1;
	const cpi = ac > 0 ? ev / ac : 1;
	const eac = cpi > 0 ? bac / cpi : bac;
	const etc = Math.max(0, eac - ac);
	const vac = bac - eac;

	return { pv, ev, ac, bac, eac, etc, sv, cv, spi, cpi, vac };
}

export function formatCurrency(value) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(value);
}

export function getPerformanceIndicator(value, type = 'index') {
	if (type === 'index') {
		if (value >= 1) return 'good';
		if (value >= 0.9) return 'warning';
		return 'bad';
	}
	if (value >= 0) return 'good';
	return 'bad';
}
