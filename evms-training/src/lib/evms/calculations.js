/**
 * EVMS (Earned Value Management System) Metric Calculations
 * Based on ANSI-748 and PMI PMBOK standards
 */

/**
 * Calculate all EVMS metrics from project state
 * @param {Object} state - { pv, ev, ac, bac }
 * @returns {Object} All EVMS metrics
 */
export function calculateEvmsMetrics({ pv, ev, ac, bac }) {
	const sv = ev - pv; // Schedule Variance
	const cv = ev - ac; // Cost Variance
	const spi = pv > 0 ? ev / pv : 1; // Schedule Performance Index
	const cpi = ac > 0 ? ev / ac : 1; // Cost Performance Index
	const eac = cpi > 0 ? bac / cpi : bac; // Estimate at Completion
	const etc = Math.max(0, eac - ac); // Estimate to Complete
	const vac = bac - eac; // Variance at Completion

	return {
		pv,
		ev,
		ac,
		bac,
		eac,
		etc,
		sv,
		cv,
		spi,
		cpi,
		vac
	};
}

/**
 * Format currency for display
 */
export function formatCurrency(value) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(value);
}

/**
 * Get performance indicator (good/warning/bad) for SPI/CPI
 */
export function getPerformanceIndicator(value, type = 'index') {
	if (type === 'index') {
		if (value >= 1) return 'good';
		if (value >= 0.9) return 'warning';
		return 'bad';
	}
	// variance type - 0 is good
	if (value >= 0) return 'good';
	if (value >= -0.1 * (value + Math.abs(value)) / 2) return 'warning'; // heuristic
	return 'bad';
}
