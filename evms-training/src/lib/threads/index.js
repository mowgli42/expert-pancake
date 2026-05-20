/**
 * Learning paths (threads): EVMS 101, metrics interpretation, project scenarios.
 */

export const THREAD_IDS = {
	evms101: 'evms101',
	metricsLiteracy: 'metricsLiteracy',
	projects: 'projects'
};

export const PDU_DISCLAIMER =
	'This interactive practice tool supplements formal training; contact hours and PDUs depend on your certifying body (PMI, etc.).';

export const learningThreads = [
	{
		id: THREAD_IDS.evms101,
		title: 'EVMS 101',
		subtitle: 'Terms, contrast & quiz',
		estimatedTime: '45–60 min',
		description:
			'Start here: how EV differs from “spend vs plan,” a tiny numeric walkthrough, core definitions (BAC through VAC), a short quiz, and links to standards bodies.',
		learningObjectives: [
			'Define BAC, PV, EV, AC and explain how they differ from spend-only tracking',
			'Calculate SV, CV, SPI, and CPI from a status snapshot',
			'Score 6+ of 8 on the closing quiz (75%+)'
		],
		teaserExamples: [
			'Mini example: BAC $100k, PV $40k, EV $35k, AC $38k — interpret SPI and CPI',
			'Quiz drill: “Which metric answers schedule performance in budget units?”'
		],
		standardsNote:
			'Teaching language aligns with EIA-748 (ANSI-748) intent and the PMI Practice Standard for Earned Value Management.',
		variant: 'academic'
	},
	{
		id: THREAD_IDS.metricsLiteracy,
		title: 'Read the metrics',
		subtitle: 'Twelve case drills',
		estimatedTime: '2–3 hours',
		description:
			'Twelve fixed snapshots with SPI, CPI, and variances—including cases where a manager’s story and the metrics disagree. Practice reconciling narrative with the numbers.',
		learningObjectives: [
			'Interpret SPI/CPI and variances from realistic program snapshots',
			'Reconcile program-manager narrative with the metrics in audit-style prompts',
			'Complete all twelve cases with manager-vs-data judgment calls'
		],
		teaserExamples: [
			'Case: Firmware milestone — PM says “green” but SPI below 1.0; pick the audit-safe response',
			'Case: Subcontractor overrun — CPI slip with baseline change control on the table'
		],
		standardsNote:
			'Covers risk/opportunity registers, baseline change control, and IPMR-style reporting ties common in ANSI-748 reviews.',
		variant: 'metrics'
	},
	{
		id: THREAD_IDS.projects,
		title: 'Project scenarios',
		subtitle: 'Choose-your-path projects',
		estimatedTime: '4–6 hours (all ten)',
		description:
			'Ten narrative projects from a backyard fence to a lunar mission. Each decision moves PV, EV, and AC—classic earned value practice.',
		learningObjectives: [
			'Apply EVMS decisions that move PV, EV, and AC through multi-turn narratives',
			'Explain schedule and cost signals (SPI/CPI, VAC) at scenario completion',
			'Complete at least three scenarios with defensible metric interpretation'
		],
		teaserExamples: [
			'Building a Fence: post-setting vs rush — see SPI move on the live dashboard',
			'Lunar Mission Program: scope creep vs baseline change control under IPMR scrutiny'
		],
		standardsNote:
			'Scenarios reference baseline change control, risk registers, and customer IPMR reporting patterns.',
		variant: 'projects'
	}
];
