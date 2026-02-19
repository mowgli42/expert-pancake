/**
 * EVMS reference content for help and reference sections
 */

export const EVMS_TERMS = {
	PV: {
		acronym: 'PV',
		name: 'Planned Value',
		formula: 'PV = budgeted cost of work scheduled',
		definition: 'Budgeted cost of the work that should be done by now—a time-phased slice of your baseline budget.',
		interpretation: 'How much value you planned to deliver by this point.'
	},
	EV: {
		acronym: 'EV',
		name: 'Earned Value',
		formula: 'EV = percent complete × total budget',
		definition: 'Budgeted cost of the work that is actually done by now.',
		interpretation: 'How much value you have actually delivered.'
	},
	AC: {
		acronym: 'AC',
		name: 'Actual Cost',
		formula: 'AC = actual spend to date',
		definition: 'What you have actually spent on the work performed so far (labor, materials, overhead).',
		interpretation: 'How much you have spent in real dollars.'
	},
	CV: {
		acronym: 'CV',
		name: 'Cost Variance',
		formula: 'CV = EV − AC',
		definition: 'Difference between earned value and actual cost.',
		interpretation: 'Positive = under budget. Negative = over budget.'
	},
	SV: {
		acronym: 'SV',
		name: 'Schedule Variance',
		formula: 'SV = EV − PV',
		definition: 'Difference between earned value and planned value.',
		interpretation: 'Positive = ahead of schedule. Negative = behind schedule.'
	},
	CPI: {
		acronym: 'CPI',
		name: 'Cost Performance Index',
		formula: 'CPI = EV / AC',
		definition: 'Efficiency ratio for cost—value delivered per dollar spent.',
		interpretation: 'CPI > 1 = under budget. CPI < 1 = over budget.'
	},
	SPI: {
		acronym: 'SPI',
		name: 'Schedule Performance Index',
		formula: 'SPI = EV / PV',
		definition: 'Efficiency ratio for schedule—work completed vs planned.',
		interpretation: 'SPI > 1 = ahead. SPI < 1 = behind.'
	},
	BAC: {
		acronym: 'BAC',
		name: 'Budget at Completion',
		formula: 'BAC = total approved budget',
		definition: 'Total approved budget for the project.',
		interpretation: 'Your original project budget.'
	},
	EAC: {
		acronym: 'EAC',
		name: 'Estimate at Completion',
		formula: 'EAC = BAC / CPI (common)',
		definition: 'Forecast total cost when done. Often BAC/CPI if current performance continues.',
		interpretation: 'Expected final cost based on current trends.'
	},
	ETC: {
		acronym: 'ETC',
		name: 'Estimate to Complete',
		formula: 'ETC = EAC − AC',
		definition: 'Remaining cost forecast to finish the project.',
		interpretation: 'How much more you expect to spend.'
	},
	VAC: {
		acronym: 'VAC',
		name: 'Variance at Completion',
		formula: 'VAC = BAC − EAC',
		definition: 'Expected over- or under-run at completion.',
		interpretation: 'VAC > 0 = under budget. VAC < 0 = over budget.'
	},
	TCPI: {
		acronym: 'TCPI',
		name: 'To-Complete Performance Index',
		formula: 'TCPI = (BAC − EV) / (BAC − AC)',
		definition: 'Required cost efficiency on remaining work to hit budget target.',
		interpretation: 'TCPI > 1 = must perform better. TCPI < 1 = can be less efficient and still meet target.'
	}
};

export const REFERENCE_SECTIONS = [
	{
		id: 'core',
		title: 'Core Building Blocks',
		content: `**Planned Value (PV)**: Budgeted cost of the work that should be done by now—a time-phased slice of your baseline budget.

**Earned Value (EV)**: Budgeted cost of the work that is actually done by now (percent complete × total budget).

**Actual Cost (AC)**: What you have actually spent on the work performed so far (labor, materials, overhead).

These three numbers feed almost every EVMS metric.`
	},
	{
		id: 'variances',
		title: 'Variances (Absolute Deltas)',
		content: `**Cost Variance (CV) = EV − AC**  
Positive CV = under budget. Negative = over budget.

**Schedule Variance (SV) = EV − PV**  
Positive SV = ahead of schedule. Negative = behind.

Example: EV $2M, AC $3M, PV $2.5M → CV = −$1M (over budget), SV = −$0.5M (behind).`
	},
	{
		id: 'indices',
		title: 'Indices (Efficiency Ratios)',
		content: `**Cost Performance Index (CPI) = EV / AC**  
CPI > 1: delivering more value per dollar than planned (good).  
CPI < 1: burning more money than value delivered (bad).

**Schedule Performance Index (SPI) = EV / PV**  
SPI > 1: ahead of schedule.  
SPI < 1: behind schedule.`
	},
	{
		id: 'forecast',
		title: 'Forecast Metrics',
		content: `**Budget at Completion (BAC)**: Total approved budget for the project.

**Estimate at Completion (EAC)**: Forecast total cost when done. Common formula: EAC = BAC / CPI (if current performance continues). Also: EAC = AC + (BAC − EV).

**Estimate to Complete (ETC)**: ETC = EAC − AC. Remaining cost forecast.

**Variance at Completion (VAC)**: VAC = BAC − EAC. VAC > 0 = expected underrun. VAC < 0 = expected overrun.

**To-Complete Performance Index (TCPI)**: Required efficiency on remaining work. TCPI = (BAC − EV) / (BAC − AC) against original budget. TCPI > 1 means you must perform better than you have so far.`
	}
];
