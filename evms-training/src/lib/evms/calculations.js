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

const SPI_ON = 0.98;
const SPI_ON_HIGH = 1.02;
const CPI_ON = 0.98;
const CPI_ON_HIGH = 1.02;

/**
 * Plain-language summary for the scenario complete screen (SPI/SV, CPI/CV, VAC/EAC).
 * @param {ReturnType<typeof calculateEvmsMetrics> | null | undefined} metrics
 */
export function summarizeScenarioComplete(metrics) {
	if (!metrics) return null;

	const { spi, cpi, sv, cv, vac, eac, bac } = metrics;
	const spiStr = spi.toFixed(2);
	const cpiStr = cpi.toFixed(2);
	const vacTol = Math.max(50, Math.abs(bac) * 0.02);
	const costTol = Math.max(25, Math.abs(bac) * 0.01);

	let scheduleLede;
	let scheduleDetail;
	if (spi >= SPI_ON_HIGH) {
		scheduleLede = 'You stayed ahead of the planned schedule.';
		scheduleDetail = `SPI is ${spiStr}, so earned value outpaced planned value overall. Schedule variance (SV) is ${formatCurrency(sv)}.`;
	} else if (spi >= SPI_ON) {
		scheduleLede = 'You stayed about on schedule.';
		scheduleDetail = `SPI is ${spiStr}, so earned value stayed close to planned value. SV is ${formatCurrency(sv)}.`;
	} else {
		scheduleLede = 'You fell behind the planned schedule.';
		scheduleDetail = `SPI is ${spiStr}, so less earned value was recorded than planned at this point. SV is ${formatCurrency(sv)}.`;
	}

	let costWork;
	if (cpi >= CPI_ON_HIGH && cv >= -costTol) {
		costWork = `Cost performance is strong for work done (CPI ${cpiStr}): you earned more value per dollar spent than a 1.0 baseline. Cost variance (CV) is ${formatCurrency(cv)}.`;
	} else if (cpi <= CPI_ON || cv < -costTol) {
		costWork = `Costs ran high relative to earned value (CPI ${cpiStr}). Cost variance (CV) is ${formatCurrency(cv)} — spending outpaced the value earned for the work recorded.`;
	} else {
		costWork = `Cost efficiency is roughly on plan (CPI ${cpiStr}). CV is ${formatCurrency(cv)}.`;
	}

	let forecast;
	if (vac > vacTol) {
		forecast = `At completion you are forecast under budget: estimate at completion (EAC) is ${formatCurrency(eac)} versus BAC ${formatCurrency(bac)} (VAC ${formatCurrency(vac)}).`;
	} else if (vac < -vacTol) {
		forecast = `At completion you are forecast over budget: EAC is ${formatCurrency(eac)} versus BAC ${formatCurrency(bac)} (VAC ${formatCurrency(vac)}).`;
	} else {
		forecast = `At completion, EAC ${formatCurrency(eac)} is close to BAC ${formatCurrency(bac)} (VAC ${formatCurrency(vac)}).`;
	}

	return {
		scheduleLede,
		scheduleDetail,
		costWork,
		forecast
	};
}
