/**
 * EVMS 101 — lesson cards (college-level) plus closing quiz.
 */

export const evms101ExternalResources = [
	{
		label: 'PMI — Practice Standard for Earned Value Management',
		href: 'https://www.pmi.org/pmbok-guide-standards/practice/earned-value-management',
		note: 'Industry framing of EVM practice and governance.'
	},
	{
		label: 'NDIA — Intent Guide (EIA-748 EVMS)',
		href: 'https://www.ndia.org/divisions/industrial-committees/earned-value-management-systems',
		note: 'Intent and implementation expectations for certified systems.'
	},
	{
		label: 'NASA — EVM portal',
		href: 'https://evm.nasa.gov/main',
		note: 'Handbooks, training, and agency-specific implementation references.'
	}
];

export const evms101Lessons = [
	{
		id: 'intro',
		title: 'What is earned value?',
		body: `Earned value management compares <strong>three fundamentals at the same time</strong>: what you planned to accomplish (PV), what you actually accomplished (EV), and what you paid to get there (AC). All three use the same unit—usually budget dollars—so schedule and cost signals stay comparable. Think of it as bookkeeping for scope: every dollar of EV means “we credibly finished this much work.”`
	},
	{
		id: 'comparison',
		title: 'Spend tracking alone vs earned value',
		body: `Many status decks still show <strong>actual spend vs a time-phased budget “S-curve.”</strong> That answers “Are we drawing down the checkbook on pace?” It does <strong>not</strong> prove the scope behind the curve is done. You can be “on budget” against a cash plan while accomplishing less work than scheduled—classic false comfort.<br><br><strong>Earned value</strong> adds the missing leg: <strong>EV</strong> ties dollars to <em>completed</em> scope. Pairing EV with <strong>PV</strong> (schedule in value terms) and <strong>AC</strong> (cost of work performed) is what produces SPI/CPI and the variances you will use in the next cards.`
	},
	{
		id: 'mini-example',
		title: 'Mini example — one control month',
		body: `Imagine <strong>BAC = $100,000</strong> for a small package. At the January status date the baseline called for <strong>PV = $40,000</strong> of valued work. The team credibly finished scope worth <strong>EV = $35,000</strong> and booked <strong>AC = $38,000</strong> for that effort.<br><br><strong>Schedule signal:</strong> SV = EV − PV = <strong>−$5,000</strong> (behind the plan in valued work). SPI = EV ÷ PV = <strong>0.875</strong>.<br><strong>Cost signal:</strong> CV = EV − AC = <strong>−$3,000</strong> (work performed cost more than the earned budget for it). CPI = EV ÷ AC ≈ <strong>0.92</strong>.<br><br>Same month: if you only compared AC to a spend curve, you might look nearly “on plan” at $38k vs $40k—EV reveals both dimensions slipped.`
	},
	{
		id: 'bac',
		title: 'BAC — Budget at Completion',
		body: `<strong>BAC</strong> is the total planned budget for the scope you baselined—your “finish line” for cost when the program is 100% complete. It is not what you have spent so far; it is the authorized budget for the whole effort. Changes to scope (formal reprogramming) can change BAC; casual overspending does not.`
	},
	{
		id: 'pv',
		title: 'PV — Planned Value',
		body: `<strong>PV</strong> (sometimes BCWS) is the value of work <strong>scheduled</strong> to be done by a control date, measured in budget dollars. If the schedule says you should have finished 40% of the scope by today, PV is roughly 40% of BAC—assuming the budget was time-phased to match that plan. PV answers: “Where should we be on the plan?”`
	},
	{
		id: 'ev',
		title: 'EV — Earned Value',
		body: `<strong>EV</strong> (sometimes BCWP) is the budgeted cost of the work <strong>actually performed</strong> to the same date. Rules matter: EV increases when objective completion criteria are met, not when invoices arrive. If you are 35% done in honest physical progress but the schedule called for 40%, EV is below PV even if you are spending aggressively.`
	},
	{
		id: 'ac',
		title: 'AC — Actual Cost',
		body: `<strong>AC</strong> (sometimes ACWP) is the realized cost of the work performed in the same period you measured EV—cash and accruals tied to that effort. High AC with low EV is the classic “burning cash without progress” warning. AC does not, by itself, tell you if you are on schedule; pair it with EV.`
	},
	{
		id: 'sv-spi',
		title: 'SV & SPI — schedule',
		body: `<strong>SV = EV − PV</strong> (schedule variance). Positive SV means you earned more value than the plan called for at this date—you are ahead in valued work. <strong>SPI = EV ÷ PV</strong> (schedule performance index). SPI above 1.0 means the same thing in ratio form. Important nuance from standards bodies: SV is in dollars, not days; it compares valued work, not the calendar directly.`
	},
	{
		id: 'cv-cpi',
		title: 'CV & CPI — cost efficiency',
		body: `<strong>CV = EV − AC</strong> (cost variance). Positive CV means the work you accomplished cost less than the budget that was “earned” for that accomplishment. <strong>CPI = EV ÷ AC</strong> (cost performance index). CPI above 1.0 means you get more than a dollar of earned value for each dollar spent—healthy efficiency for the period.`
	},
	{
		id: 'eac-etc-vac',
		title: 'EAC, ETC, and VAC — forecasts',
		body: `A common teaching forecast uses <strong>EAC = BAC ÷ CPI</strong> (assume future efficiency matches past). <strong>ETC = EAC − AC</strong> is how much more you expect to spend from now to finish. <strong>VAC = BAC − EAC</strong> (variance at completion) is the projected overrun or underrun at the end. These formulas are pedagogical defaults; real programs blend multiple EAC methods.`
	},
	{
		id: 'wrap',
		title: 'How the pieces fit',
		body: `At any status date you can read the story quickly: <strong>SPI</strong> and <strong>SV</strong> describe schedule performance in value terms; <strong>CPI</strong> and <strong>CV</strong> describe cost efficiency; <strong>EAC / VAC</strong> extend those trends toward the finish. Next is a short quiz—no trick questions, just checks that the vocabulary sticks.<br><br>After the quiz, try <strong>Read the metrics</strong> for twelve short cases (including “what if the manager says X?”), then the <strong>Project scenarios</strong> path for hands-on practice.`,
		showResources: true
	}
];

/** For tests: clicks on “Next” before “Start quiz” appears */
export const evms101LessonCount = evms101Lessons.length;

export const evms101Quiz = [
	{
		id: 'q1',
		prompt: 'Which quantity answers: “How much work should have been done by this date, in budget terms?”',
		options: ['EV', 'PV', 'AC', 'EAC'],
		correctIndex: 1,
		explanation: 'PV is planned value—the budgeted value of work scheduled to be complete by the status date.'
	},
	{
		id: 'q2',
		prompt: 'Earned Value (EV) increases when:',
		options: [
			'A vendor submits an invoice',
			'Objective work is completed per the EV rules',
			'The calendar advances one week',
			'Management increases the staffing plan'
		],
		correctIndex: 1,
		explanation: 'EV reflects accomplished scope against the baseline, not spending intent or elapsed time alone.'
	},
	{
		id: 'q3',
		prompt: 'Schedule variance (SV) is calculated as:',
		options: ['PV − EV', 'EV − PV', 'EV − AC', 'BAC − AC'],
		correctIndex: 1,
		explanation: 'SV = EV − PV. Positive SV means more value was earned than was planned by this date.'
	},
	{
		id: 'q4',
		prompt: 'If SPI = 0.92, the program is:',
		options: [
			'Ahead of the planned pace of valued work',
			'Behind the planned pace of valued work',
			'Over budget in absolute dollars',
			'Exactly at BAC'
		],
		correctIndex: 1,
		explanation: 'SPI = EV ÷ PV. Below 1.0 means EV < PV—less earned value than planned for this date.'
	},
	{
		id: 'q5',
		prompt: 'Cost variance (CV) is calculated as:',
		options: ['AC − EV', 'PV − AC', 'EV − AC', 'BAC − PV'],
		correctIndex: 2,
		explanation: 'CV = EV − AC. Positive CV means earned value exceeds actual cost for the work performed.'
	},
	{
		id: 'q6',
		prompt: 'CPI = 1.08 most directly implies:',
		options: [
			'The program is ahead of schedule',
			'Each dollar spent yields about $1.08 of earned value',
			'VAC must be positive',
			'PV equals BAC'
		],
		correctIndex: 1,
		explanation: 'CPI = EV ÷ AC is a cost-efficiency index; above 1.0 means favorable cost performance for work done.'
	},
	{
		id: 'q7',
		prompt: 'In the simple forecast EAC = BAC ÷ CPI, if CPI falls below 1.0 and nothing else changes:',
		options: ['EAC decreases', 'EAC increases', 'EAC always equals BAC', 'CPI no longer affects EAC'],
		correctIndex: 1,
		explanation: 'Dividing by a smaller CPI (worse efficiency) raises EAC—forecasting more total cost to finish the same BAC scope.'
	},
	{
		id: 'q8',
		prompt: 'VAC (variance at completion) is:',
		options: ['EV − PV', 'BAC − EAC', 'EAC − AC', 'AC − BAC'],
		correctIndex: 1,
		explanation: 'VAC = BAC − EAC. Positive VAC forecasts finishing under the budget at completion.'
	}
];
