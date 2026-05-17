/**
 * Learning paths (threads): EVMS 101, metrics interpretation, project scenarios.
 */

export const THREAD_IDS = {
	evms101: 'evms101',
	metricsLiteracy: 'metricsLiteracy',
	projects: 'projects'
};

export const learningThreads = [
	{
		id: THREAD_IDS.evms101,
		title: 'EVMS 101',
		subtitle: 'Terms, contrast & quiz',
		description:
			'Start here: how EV differs from “spend vs plan,” a tiny numeric walkthrough, core definitions (BAC through VAC), a short quiz, and links to standards bodies.',
		variant: 'academic'
	},
	{
		id: THREAD_IDS.metricsLiteracy,
		title: 'Read the metrics',
		subtitle: 'Twelve case drills',
		description:
			'Twelve fixed snapshots with SPI, CPI, and variances—including cases where a manager’s story and the metrics disagree. Practice reconciling narrative with the numbers.',
		variant: 'metrics'
	},
	{
		id: THREAD_IDS.projects,
		title: 'Project scenarios',
		subtitle: 'Choose-your-path projects',
		description:
			'Ten narrative projects from a backyard fence to a lunar mission. Each decision moves PV, EV, and AC—classic earned value practice.',
		variant: 'projects'
	}
];
