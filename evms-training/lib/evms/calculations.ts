/**
 * EVMS metric calculations (ANSI-748 / PMI PMBOK)
 */

export type EvmsMetrics = {
	pv: number;
	ev: number;
	ac: number;
	bac: number;
	eac: number;
	etc: number;
	sv: number;
	cv: number;
	spi: number;
	cpi: number;
	vac: number;
};

export function calculateEvmsMetrics({ pv, ev, ac, bac }: { pv: number; ev: number; ac: number; bac: number }): EvmsMetrics {
	const sv = ev - pv;
	const cv = ev - ac;
	const spi = pv > 0 ? ev / pv : 1;
	const cpi = ac > 0 ? ev / ac : 1;
	const eac = cpi > 0 ? bac / cpi : bac;
	const etc = Math.max(0, eac - ac);
	const vac = bac - eac;

	return { pv, ev, ac, bac, eac, etc, sv, cv, spi, cpi, vac };
}

export function formatCurrency(value: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(value);
}

export function getPerformanceIndicator(value: number, type: 'index' | 'variance' = 'index'): 'good' | 'warning' | 'bad' {
	if (type === 'index') {
		if (value >= 1) return 'good';
		if (value >= 0.9) return 'warning';
		return 'bad';
	}
	if (value >= 0) return 'good';
	return 'bad';
}

/**
 * Illustrative "days of planned-pace budget": SV ÷ (BAC / planned duration).
 * Not Earned Schedule time variance; use when explaining why SV is in dollars.
 */
export function svToApproxPlannedPaceDays(sv: number, bac: number, plannedDurationDays?: number): number | null {
	if (
		sv == null ||
		!Number.isFinite(sv) ||
		!plannedDurationDays ||
		plannedDurationDays <= 0 ||
		!bac ||
		bac <= 0
	) {
		return null;
	}
	const dollarsPerPlannedDay = bac / plannedDurationDays;
	if (!Number.isFinite(dollarsPerPlannedDay) || dollarsPerPlannedDay === 0) return null;
	const d = sv / dollarsPerPlannedDay;
	return Number.isFinite(d) ? d : null;
}

const SPI_ON = 0.98;
const SPI_ON_HIGH = 1.02;
const CPI_ON = 0.98;
const CPI_ON_HIGH = 1.02;

function roundApproxPaceDays(d: number | null): number | null {
	if (d == null || !Number.isFinite(d)) return null;
	const abs = Math.abs(d);
	if (abs < 0.05) return 0;
	if (abs < 2) return Math.round(d * 10) / 10;
	return Math.round(d);
}

function buildScheduleVarianceNarrative(
	spiStr: string,
	sv: number,
	bac: number,
	plannedDurationDays: number | undefined
): string {
	let detail = `SPI is ${spiStr}. SV is ${formatCurrency(sv)} (EV − PV). In standard EVM, SV is expressed in budget dollars—the same units as EV and PV (e.g., ANSI-748)—because schedule performance compares *valued* planned versus earned work, not elapsed calendar days by itself.`;
	const raw = svToApproxPlannedPaceDays(sv, bac, plannedDurationDays);
	const paceDays = raw == null ? null : roundApproxPaceDays(raw);
	if (paceDays != null && plannedDurationDays && Math.abs(paceDays) > 0) {
		const dir = paceDays > 0 ? 'ahead' : 'behind';
		detail += ` If BAC were spread evenly over this scenario’s ${plannedDurationDays}-day plan horizon, that SV is about ${Math.abs(paceDays)} day${Math.abs(paceDays) === 1 ? '' : 's'} of planned-pace budget ${dir}—a linear teaching analog only (Earned Schedule adds time-based schedule variance when PV is time-phased; SPI stays the clearest unitless schedule index).`;
	}
	return detail;
}

export function summarizeScenarioComplete(
	metrics: EvmsMetrics | null | undefined,
	context?: { plannedDurationDays?: number }
): {
	scheduleLede: string;
	scheduleDetail: string;
	costWork: string;
	forecast: string;
} | null {
	if (!metrics) return null;

	const plannedDurationDays = context?.plannedDurationDays;
	const { spi, cpi, sv, cv, vac, eac, bac } = metrics;
	const spiStr = spi.toFixed(2);
	const cpiStr = cpi.toFixed(2);
	const vacTol = Math.max(50, Math.abs(bac) * 0.02);
	const costTol = Math.max(25, Math.abs(bac) * 0.01);

	let scheduleLede;
	let scheduleDetail;
	if (spi >= SPI_ON_HIGH) {
		scheduleLede = 'You stayed ahead of the planned schedule.';
		scheduleDetail = buildScheduleVarianceNarrative(spiStr, sv, bac, plannedDurationDays);
	} else if (spi >= SPI_ON) {
		scheduleLede = 'You stayed about on schedule.';
		scheduleDetail = buildScheduleVarianceNarrative(spiStr, sv, bac, plannedDurationDays);
	} else {
		scheduleLede = 'You fell behind the planned schedule.';
		scheduleDetail = buildScheduleVarianceNarrative(spiStr, sv, bac, plannedDurationDays);
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
