/**
 * Fixed metric snapshots + interpretation questions (manager narrative vs metrics).
 */

export const metricsLiteracyScenarios = [
	{
		id: 1,
		title: 'Firmware milestone review',
		subtitle: 'Mid-integration gate',
		narrative:
			'Your control account covers firmware integration through the first customer demo. Finance just closed week 20 of a 40-week plan. The time-phased baseline and earned-value rulesets are applied consistently.',
		pv: 800_000,
		ev: 720_000,
		ac: 680_000,
		bac: 1_600_000,
		questions: [
			{
				prompt: 'Taken together, SPI and CPI suggest the account is:',
				options: [
					'Ahead of schedule and spending efficiently for work done',
					'Behind schedule but spending efficiently for work done',
					'On schedule and over budget',
					'Ahead of schedule and over budget'
				],
				correctIndex: 1,
				explanation:
					'SPI = EV ÷ PV is below 1.0 (less earned value than planned by this date). CPI = EV ÷ AC is above 1.0—favorable cost efficiency for the accomplishments recorded.'
			},
			{
				managerQuote:
					'“We are only a little light on burn; the real issue is suppliers are gouging us on parts.”',
				prompt: 'Which response best reconciles that story with the metrics shown?',
				options: [
					'AC is below EV here—CPI is favorable, so the data do not support a “gouging / runaway spend” narrative for this status date',
					'Because SPI is below 1, AC must be above BAC',
					'CPI cannot exceed 1.0 when SPI is below 1.0',
					'EV is irrelevant if invoices are still in approval'
				],
				correctIndex: 0,
				explanation:
					'For this snapshot, AC < EV gives positive CV and CPI > 1. A parts-cost crisis would normally show up as weak CPI (and often negative CV), not the pattern on the left.'
			}
		]
	},
	{
		id: 2,
		title: 'Construction package — civil',
		subtitle: 'Month-end status',
		narrative:
			'A civil work package on a data center pad. Weather was good; the crew pushed quantity. Supervision and overtime pushed spend faster than the baseline curve expected.',
		pv: 450_000,
		ev: 495_000,
		ac: 520_000,
		bac: 900_000,
		questions: [
			{
				prompt: 'Which statement best matches the indices?',
				options: [
					'Behind schedule and under budget',
					'Ahead of schedule and under budget',
					'Ahead of schedule with cost efficiency weaker than 1.0 CPI',
					'On schedule with CPI exactly 1.0'
				],
				correctIndex: 2,
				explanation:
					'SPI > 1 because EV exceeds PV. CPI < 1 because AC exceeds EV—you are buying progress, but each dollar earns less than a dollar of value.'
			},
			{
				managerQuote: '“Schedule risk is our only problem—once we catch up, cost will fix itself.”',
				prompt: 'What do the metrics say about that claim at this status date?',
				options: [
					'CPI below 1 already signals cost efficiency is weak for work performed—schedule and cost both need attention',
					'CPI above 1 means cost is fine; only SPI matters',
					'Because SPI > 1, AC must be below PV',
					'EV equals AC by definition when SPI > 1'
				],
				correctIndex: 0,
				explanation:
					'Strong SPI does not erase a CPI under 1.0. You are ahead in valued work but paying more than earned for that work—leadership should address both, not dismiss cost.'
			}
		]
	},
	{
		id: 3,
		title: 'Clinical trial site startup',
		subtitle: 'Enrollment lag',
		narrative:
			'Sites activated slower than the operating plan. Spend reflects kept monitors, travel, and hold costs while subject visits trail the curve.',
		pv: 1_200_000,
		ev: 900_000,
		ac: 1_050_000,
		bac: 4_800_000,
		questions: [
			{
				prompt: 'Both SV and CV are negative. That combination most directly says:',
				options: [
					'The trial finished early and returned funds to the sponsor',
					'Less valued progress than planned, and spending is ahead of the earned value',
					'PV must be wrong because AC cannot exceed EV',
					'VAC is necessarily positive'
				],
				correctIndex: 1,
				explanation:
					'Negative SV (EV < PV) signals schedule slip in value terms. Negative CV (EV < AC) signals unfavorable cost variance—cash is outpacing accomplishments.'
			},
			{
				managerQuote: '“This is purely a calendar slip—we are not over budget.”',
				prompt: 'How should an IPT lead respond using the metrics?',
				options: [
					'Negative CV means cost performance for work done is already unfavorable, not “only schedule”',
					'If SV is negative, CV must be zero',
					'AC below EV proves there is no cost issue',
					'SPI below 1 automatically forces CPI above 1'
				],
				correctIndex: 0,
				explanation:
					'“Calendar slip” may be true in the real world, but EVM already shows AC ahead of EV—cost efficiency is weak even while schedule is weak in value terms.'
			},
			{
				prompt: 'Using the simple forecast EAC = BAC ÷ CPI with these numbers, the story for leadership is:',
				options: [
					'EAC will be below BAC unless scope changes',
					'EAC is forecast above BAC unless performance improves or scope is rebaselined',
					'CPI above 1.0 guarantees VAC > 0',
					'SPI below 1.0 forces CPI below 1.0'
				],
				correctIndex: 1,
				explanation:
					'CPI < 1 pushes EAC above BAC in that elementary formula—a classic “at completion overrun” warning absent recovery actions.'
			}
		]
	},
	{
		id: 4,
		title: 'Enterprise software rollout',
		subtitle: 'Steady burn, steady value',
		narrative:
			'Deployments tracked the baseline curve closely. Finance confirms accruals align with accepted user stories for the wave.',
		pv: 600_000,
		ev: 605_000,
		ac: 598_000,
		bac: 2_400_000,
		questions: [
			{
				prompt: 'SPI and CPI are both very near 1.0 with small positive CV. Which characterization fits best?',
				options: [
					'Large overrun with schedule recovery already booked',
					'Roughly on plan for both valued schedule position and cost efficiency',
					'Major schedule slip masked by high PV',
					'EV cannot be within 1% of PV in real programs'
				],
				correctIndex: 1,
				explanation:
					'EV slightly above PV gives SPI just over 1.0; EV above AC gives CPI just over 1.0 and a modest positive CV—near-green execution against the baseline.'
			},
			{
				managerQuote: '“We are crushing it—double the team and we will finish six months early.”',
				prompt: 'What is the most disciplined reading of the metrics?',
				options: [
					'Indices are essentially on target; any “crushing it / half-year early” claim is not supported by SPI/CPI at this status date',
					'SPI slightly above 1 proves six months of schedule pull-ahead',
					'Positive CV means BAC can be reduced without analysis',
					'PV should be set equal to AC to show the real plan'
				],
				correctIndex: 0,
				explanation:
					'Small favorable variances are good news but do not justify heroic acceleration narratives. Validate any early-finish claim with time-phased schedules and remaining scope, not SPI alone.'
			}
		]
	},
	{
		id: 5,
		title: 'Defense subsystem — integration line',
		subtitle: 'Test throughput up, rework up',
		narrative:
			'Hardware is moving through environmental test faster than the baseline, but technicians are logging extra shifts to clear failures the same week.',
		pv: 2_000_000,
		ev: 2_200_000,
		ac: 2_350_000,
		bac: 8_000_000,
		questions: [
			{
				prompt: 'At this status date, schedule and cost performance are best described as:',
				options: [
					'Behind schedule and under budget',
					'Ahead of valued schedule position but with CPI below 1.0',
					'On schedule with CPI exactly 1.0',
					'Behind schedule and CPI above 1.0'
				],
				correctIndex: 1,
				explanation: 'EV > PV gives SPI > 1 (ahead in valued work). AC > EV gives CPI < 1—unfavorable cost efficiency for the accomplishments.'
			},
			{
				managerQuote: '“The headline is schedule recovery—we can ignore cost until the next gate.”',
				prompt: 'Which answer best aligns with EVM?',
				options: [
					'CPI < 1 is a contemporaneous cost signal; deferring cost review contradicts the metrics',
					'When SPI > 1, CPI is guaranteed to be ≥ 1',
					'AC is not part of CPI',
					'EV should be reduced to match AC so SPI stays meaningful'
				],
				correctIndex: 0,
				explanation:
					'Earned value deliberately surfaces schedule and cost together. Strong SPI does not waive analysis of CPI or forecast at completion.'
			}
		]
	},
	{
		id: 6,
		title: 'IT datacenter migration',
		subtitle: 'Cutover weekend slipped',
		narrative:
			'Cutover tasks slipped two waves; contractors stayed on site burning hours while go-live scope was descoped for the quarter.',
		pv: 1_500_000,
		ev: 1_200_000,
		ac: 1_350_000,
		bac: 5_000_000,
		questions: [
			{
				prompt: 'SV and CV are both negative. SPI and CPI are both below 1.0. That means:',
				options: [
					'Only schedule is off track; cost is healthy',
					'Both valued schedule position and cost efficiency are weak versus the baseline',
					'Only cost is off track; schedule is healthy',
					'The program must be complete already'
				],
				correctIndex: 1,
				explanation:
					'Negative SV with SPI < 1 shows less earned value than planned. Negative CV with CPI < 1 shows spending efficiency below 1.0 for the work recorded.'
			},
			{
				managerQuote: '“Burn is slightly under plan, so we are fine on budget—this is just a sequencing hiccup.”',
				prompt: 'Why does that story fail against the numbers?',
				options: [
					'EV is well below PV (schedule slip in value terms) and CPI is still below 1—cost efficiency is not “fine”',
					'Because AC < PV, CPI must be above 1',
					'Descoping scope always increases EV automatically',
					'SV cannot be negative if AC is below BAC'
				],
				correctIndex: 0,
				explanation:
					'AC slightly below PV does not rescue CPI when EV is even lower. The triple pattern (SPI<1, CPI<1, negative variances) is a red flag for IPT review.'
			}
		]
	},
	{
		id: 7,
		title: 'Ship repair — availability window',
		subtitle: 'Tank inspections',
		narrative:
			'Unexpected tank work added cost, but the crew earned the extra scope faster than the replan inserted PV for the same month.',
		pv: 3_200_000,
		ev: 3_350_000,
		ac: 3_500_000,
		bac: 12_000_000,
		questions: [
			{
				prompt: 'Which pair best matches this snapshot?',
				options: [
					'SPI < 1 and CPI > 1',
					'SPI > 1 and CPI < 1',
					'SPI = CPI = 1.0 exactly',
					'SPI < 1 and CPI < 1'
				],
				correctIndex: 1,
				explanation: 'EV exceeds PV (SPI > 1). AC exceeds EV (CPI < 1)—ahead in valued work, but dollars are not buying efficiency.'
			},
			{
				managerQuote: '“We are on budget because the customer approved the overrun last Tuesday.”',
				prompt: 'What does EVM say before any formal BAC change?',
				options: [
					'Until BAC is rebaselined in the system, CPI < 1 still signals weak cost efficiency versus earned work',
					'Customer verbal approval instantly resets EV to match AC',
					'CPI ignores scope growth by design',
					'If SPI > 1, VAC must be positive regardless of CPI'
				],
				correctIndex: 0,
				explanation:
					'Management direction matters, but metrics reflect the current baseline. Formal reprogramming changes BAC; anecdotes do not rewrite CPI.'
			}
		]
	},
	{
		id: 8,
		title: 'Pharma validation batch',
		subtitle: 'Protocol deviation hold',
		narrative:
			'Manufacturing held the line on spend while quality investigated deviations. Little new product was released, but invoices stayed controlled.',
		pv: 900_000,
		ev: 600_000,
		ac: 580_000,
		bac: 3_600_000,
		questions: [
			{
				prompt: 'SV is negative while CV is positive. Which reading is most accurate?',
				options: [
					'You are ahead of schedule and over budget',
					'You are behind in valued work yet slightly favorable on cost efficiency for what was accomplished',
					'You are on schedule and on budget',
					'SV and CV must have the same sign'
				],
				correctIndex: 1,
				explanation:
					'EV < PV drives negative SV / SPI < 1. EV > AC drives positive CV / CPI > 1—possible when spend is throttled during a technical hold.'
			},
			{
				managerQuote: '“Finance says we are under spend versus plan, so we are ahead of schedule.”',
				prompt: 'What is wrong with equating underspend with schedule gain?',
				options: [
					'Schedule position is measured by EV vs PV; lower AC without EV does not create schedule credit',
					'Underspend always implies SPI > 1',
					'PV equals AC in every monthly close',
					'EV is defined as the lesser of PV and AC'
				],
				correctIndex: 0,
				explanation:
					'“Under spend” can simply mean work stopped. SPI answers whether valued accomplishments kept pace with the plan—not whether checks cleared slowly.'
			}
		]
	},
	{
		id: 9,
		title: 'Satellite payload integration',
		subtitle: 'Late parts, premium freight',
		narrative:
			'Late parts compressed assembly; premium freight and weekend shifts lifted AC while engineers partially caught up on bench work.',
		pv: 4_000_000,
		ev: 3_900_000,
		ac: 4_200_000,
		bac: 16_000_000,
		questions: [
			{
				prompt: 'Relative to the baseline, this account is:',
				options: [
					'Ahead of schedule and under budget',
					'Slightly behind in valued work with unfavorable cost efficiency',
					'Exactly on plan for both dimensions',
					'Ahead of schedule with CPI above 1.0'
				],
				correctIndex: 1,
				explanation:
					'EV < PV yields SPI slightly below 1. AC > EV yields CPI below 1—mild schedule slip with clearer cost pressure.'
			},
			{
				managerQuote: '“SPI is basically 1, so leadership should focus only on the freight invoices.”',
				prompt: 'How complete is that message?',
				options: [
					'Incomplete—CPI < 1 already flags cost efficiency; SPI near 1 still shows a small schedule gap in value terms',
					'Correct—SPI within 2% of 1 means schedule is off the risk register',
					'Freight is excluded from AC by ANSI-748',
					'When SPI < 1, CPI must be > 1'
				],
				correctIndex: 0,
				explanation:
					'Near-1 SPI can hide a material SV in dollars on large BAC. Cost variance is already negative—both dimensions deserve airtime.'
			}
		]
	},
	{
		id: 10,
		title: 'HR payroll cloud cutover',
		subtitle: 'Parallel run extended',
		narrative:
			'Parallel-run staffing stayed high to protect pay checks; fewer go-live milestones were accepted than the baseline curve assumed.',
		pv: 1_000_000,
		ev: 820_000,
		ac: 1_050_000,
		bac: 4_000_000,
		questions: [
			{
				prompt: 'Both variances are negative. The leadership headline should be:',
				options: [
					'Schedule and cost performance are both weak versus the baseline at this date',
					'Only staffing is weak; EV is not meaningful for SaaS',
					'Only cost is weak; SPI is undefined',
					'The program is forecast under BAC automatically'
				],
				correctIndex: 0,
				explanation:
					'Negative SV and CV with SPI and CPI below 1.0 are the textbook “behind and inefficient” pattern until recovery plans show up in the forecast.'
			},
			{
				managerQuote: '“This is just a staffing blip, not a real overrun—ignore EAC until next quarter.”',
				prompt: 'What is the metric-grounded counterpoint?',
				options: [
					'CPI < 1 already worsens an EAC = BAC ÷ CPI teaching forecast; waiting a quarter does not erase the signal',
					'EAC cannot move until the program is 90% complete',
					'Staffing costs are excluded from CPI',
					'If SPI < 1, EAC always equals BAC'
				],
				correctIndex: 0,
				explanation:
					'Even simple EAC math reacts immediately to weak CPI. “Blip” language needs a recovery plan reflected in future EV and AC trends, not denial.'
			}
		]
	},
	{
		id: 11,
		title: 'Transmission line segment',
		subtitle: 'Easement delay, idle spread',
		narrative:
			'Easement protests idled spread equipment. Crews earned little scope while standby costs accrued.',
		pv: 5_500_000,
		ev: 4_000_000,
		ac: 4_800_000,
		bac: 22_000_000,
		questions: [
			{
				prompt: 'Which statement matches SPI and CPI?',
				options: [
					'Ahead of schedule with favorable CPI',
					'Behind in valued work with CPI below 1.0',
					'On schedule with CPI above 1.0',
					'Cannot tell without BAC'
				],
				correctIndex: 1,
				explanation:
					'EV is far under PV (SPI well below 1). AC exceeds EV (CPI < 1)—idle cost while accomplishments lag.'
			},
			{
				managerQuote: '“We are on plan for work—most towers are still on the truck, so EV is wrong.”',
				prompt: 'Choose the best analyst response.',
				options: [
					'If EV rules credit only placed-and-tensioned structures, low EV honestly reflects accomplishment; challenge the rules with data, not narrative alone',
					'EV must equal PV whenever equipment is on site',
					'Idle standby costs belong in PV, not AC',
					'SPI cannot be below 1 when protests occur'
				],
				correctIndex: 0,
				explanation:
					'If the dispute is about measurement, open the EV technique—not the index math. The metrics are consistent with “little credited progress, real dollars spent.”'
			}
		]
	},
	{
		id: 12,
		title: 'Defense software — CPR review',
		subtitle: 'Milestone K months late',
		narrative:
			'Software integration is late versus the IMS, but the team capitalized labor into WIP aggressively; AC and EV moved together while PV stalled on missed milestones.',
		pv: 6_000_000,
		ev: 5_400_000,
		ac: 5_500_000,
		bac: 24_000_000,
		questions: [
			{
				prompt: 'At this cut, schedule vs cost signals are:',
				options: [
					'Ahead on schedule, strong CPI',
					'Behind on valued schedule with mild unfavorable CPI',
					'On schedule, CPI undefined',
					'Behind on schedule with CPI above 1.05'
				],
				correctIndex: 1,
				explanation:
					'EV < PV gives SPI < 1 (behind in valued work). EV slightly below AC gives CPI just under 1—small negative CV.'
			},
			{
				managerQuote:
					'“EV is understated because contractors are slow to report; SPI is artificially low—trust the IMS, not EVM.”',
				prompt: 'What is the most constructive path?',
				options: [
					'If reporting lag is real, show the recovery plan and EV timing; until EV catches up, the books reflect authorized rules—not alternate schedules',
					'Replace EV with PV so SPI returns to 1.0',
					'CPI ignores contractor data by standard',
					'When IMS and EVM disagree, IMS always wins without analysis'
				],
				correctIndex: 0,
				explanation:
					'EV timing issues happen; the fix is disciplined forecasting and EV technique review, not discarding SPI. Metrics and master schedule should be reconciled with evidence.'
			}
		]
	}
];
