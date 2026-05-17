/**
 * Learning paths (threads): project scenarios, EVMS 101, metrics interpretation.
 */

export const THREAD_IDS = {
	projects: 'projects',
	evms101: 'evms101',
	metricsLiteracy: 'metricsLiteracy'
};

export const learningThreads = [
	{
		id: THREAD_IDS.projects,
		title: 'Project scenarios',
		subtitle: 'Choose-your-path projects',
		description:
			'Ten narrative projects from a backyard fence to a lunar mission. Each decision moves PV, EV, and AC—classic earned value practice.',
		variant: 'projects'
	},
	{
		id: THREAD_IDS.evms101,
		title: 'EVMS 101',
		subtitle: 'Terms & concepts',
		description:
			'Intro-level walkthrough of core ANSI-748 style terms (BAC, PV, EV, variances, indices, forecasts) with a short quiz at the end.',
		variant: 'academic'
	},
	{
		id: THREAD_IDS.metricsLiteracy,
		title: 'Read the metrics',
		subtitle: 'Scenario drills',
		description:
			'Short program snapshots with fixed numbers. Answer what SPI, CPI, SV, and CV imply about schedule and cost performance.',
		variant: 'metrics'
	}
];
