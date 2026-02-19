/**
 * Advanced Topics: When EVMS May Not Be the Best Fit
 * Scenarios where alternative tracking approaches are often better.
 * References: PMI, GAO, NDIA, industry case studies.
 */

export const ADVANCED_TOPICS = [
	{
		id: 'loe-support',
		title: 'Level of Effort (LOE) & Support Work',
		subtitle: 'Help desk, on-call, tier support',
		whyNotEVM: 'EVMS requires discrete deliverables with measurable progress. LOE work has no tangible milestones—support tickets, on-call hours, and maintenance tasks don\'t map to "percent complete" or earned value. Time spent ≠ value earned in a meaningful way.',
		betterApproach: 'Time tracking, ticket throughput, SLA metrics, capacity planning. Consider burn rate vs. allocation rather than PV/EV/AC.',
		references: [
			{
				title: 'PMI Practice Standard for Earned Value Management',
				url: 'https://www.pmi.org/learning/library/earned-value-management-practice-standard-6979',
				note: 'Discusses LOE as special case in EVM'
			},
			{
				title: 'NDIA EVMS Application Guide',
				url: 'https://www.ndia.org/-/media/policy/earned-value/evms-application-guide.ashx',
				note: 'LOE work package guidelines'
			}
		]
	},
	{
		id: 'agile',
		title: 'Agile / Scrum Projects',
		subtitle: 'Sprint-based, story points, evolving scope',
		whyNotEVM: 'Traditional EVMS assumes a fixed baseline (scope, schedule, budget). Agile projects embrace changing requirements, deliver in sprints, and measure velocity in story points—not dollars. PV/EV/AC require a time-phased cost baseline that conflicts with agile\'s adaptive planning.',
		betterApproach: 'Agile metrics: velocity, burndown, sprint goals, release burnup. Consider AgileEVM or Earned Business Value for hybrids.',
		references: [
			{
				title: 'GAO: Schedule Assessment Guide (Agile)',
				url: 'https://www.gao.gov/products/GAO-16-89G',
				note: 'GAO guidance on agile schedule assessment'
			},
			{
				title: 'Agile and Earned Value - PMI',
				url: 'https://www.pmi.org/learning/library/agile-earned-value-management-6340',
				note: 'Bridging agile with EVM concepts'
			}
		]
	},
	{
		id: 'research',
		title: 'Research & Development',
		subtitle: 'Exploratory, uncertain outcomes',
		whyNotEVM: 'R&D projects often have uncertain scope and no clear definition of "done." You can\'t baseline work that hasn\'t been invented yet. Percent complete is subjective when deliverables are knowledge, not products.',
		betterApproach: 'Stage-gate reviews, milestone funding, technical performance measures. Phase-based funding with go/no-go decisions.',
		references: [
			{
				title: 'EVM for R&D - Defense Acquisition University',
				url: 'https://www.dau.edu/tools/evm',
				note: 'DoD guidance on EVM for R&D'
			},
			{
				title: 'ANSI/EIA-748 EVMS Guidelines',
				url: 'https://webstore.ansi.org/standards/eia/ansieia748b2018',
				note: 'Industry standard for EVMS application'
			}
		]
	},
	{
		id: 'maintenance',
		title: 'Maintenance & Operations',
		subtitle: 'Ongoing work, no project end date',
		whyNotEVM: 'EVMS is designed for projects with a start and end. Operations and maintenance are continuous—there\'s no "completion" to earn toward. Baseline would be arbitrary; replanning would be constant.',
		betterApproach: 'Run rates, uptime, incident metrics, maintenance backlogs. Budget vs. actual with trend analysis.',
		references: [
			{
				title: 'O&M vs Project Management - PMI',
				url: 'https://www.pmi.org/learning/library/operations-maintenance-project-management-7094',
				note: 'Distinguishing O&M from project work'
			}
		]
	},
	{
		id: 'creative',
		title: 'Creative & Design Work',
		subtitle: 'Iterative design, subjective completion',
		whyNotEVM: 'Design sprints, UX iterations, and creative work resist discrete milestones. "50% complete" on a logo or user flow is subjective. EV requires objective, measurable deliverables.',
		betterApproach: 'Review gates, design iterations, user feedback cycles. Cap per iteration rather than EV curves.',
		references: [
			{
				title: 'Managing Creative Projects - Harvard BR',
				url: 'https://hbr.org/topic/subject/managing-projects',
				note: 'Creative project management approaches'
			}
		]
	},
	{
		id: 'emergency',
		title: 'Emergency Response & Crisis',
		subtitle: 'No baseline, reactive, time-critical',
		whyNotEVM: 'Disaster response, outages, and crises have no time to establish a baseline. Work is driven by events, not a plan. PV would be meaningless when priorities shift hourly.',
		betterApproach: 'Incident response metrics, recovery time, resource allocation tracking. Cost tracking without EV baseline.',
		references: [
			{
				title: 'FEMA Project Management - Disaster Recovery',
				url: 'https://www.fema.gov/emergency-managers/national-preparedness',
				note: 'Emergency management frameworks'
			}
		]
	},
	{
		id: 'consulting',
		title: 'Consulting & Time-and-Materials',
		subtitle: 'Deliverable is hours, not products',
		whyNotEVM: 'T&M contracts sell expertise by the hour. "Earned value" is effectively hours × rate—EV would track cost, not progress. No discrete product milestones to earn against.',
		betterApproach: 'Utilization rates, burn against contract ceiling, deliverable milestones. Cost accrual and variance to contract.',
		references: [
			{
				title: 'T&M Contract Management - GSA',
				url: 'https://www.gsa.gov',
				note: 'Federal T&M contract guidance'
			}
		]
	},
	{
		id: 'startup',
		title: 'Start-up & Discovery Phase',
		subtitle: 'Pivoting, product-market fit, lean',
		whyNotEVM: 'Early-stage ventures pivot frequently. A baseline would be obsolete in weeks. Scope is discovery, not delivery. EVMS assumes you know what you\'re building.',
		betterApproach: 'Lean metrics, runway, experiment cost. Build-measure-learn cycles over EV curves.',
		references: [
			{
				title: 'Lean Startup - Eric Ries',
				url: 'https://www.leanstartup.com/principles',
				note: 'Lean methodology for startups'
			}
		]
	},
	{
		id: 'compliance',
		title: 'Compliance & Regulatory',
		subtitle: 'External deadlines, audit-driven',
		whyNotEVM: 'Compliance work is often driven by regulatory deadlines, not deliverables. Progress may be binary (audit passed/failed). EV doesn\'t capture the risk of non-compliance.',
		betterApproach: 'Compliance calendars, audit readiness, finding closure rates. Deadline tracking vs. EV.',
		references: [
			{
				title: 'Project Management for Compliance - PMI',
				url: 'https://www.pmi.org/learning/library',
				note: 'Compliance project approaches'
			}
		]
	},
	{
		id: 'innovation-labs',
		title: 'Innovation Labs & Hackathons',
		subtitle: 'Open-ended experimentation',
		whyNotEVM: 'Labs and hackathons are designed for experimentation with no fixed scope. Success is learning, not delivery. EV would force artificial baselines and distort the purpose.',
		betterApproach: 'Experiment logs, learning outcomes, idea funnel. Investment allocation rather than earned value.',
		references: [
			{
				title: 'Innovation Portfolio Management',
				url: 'https://hbr.org/topic/subject/innovation',
				note: 'Managing innovation investments'
			}
		]
	}
];
