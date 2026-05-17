/**
 * Fixed metric snapshots + interpretation questions (no branching).
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
				prompt: 'SV is negative while CV is positive. In plain language that usually means:',
				options: [
					'You are underspending the entire BAC with no schedule risk',
					'You accomplished less valued work than planned, yet the work you did cost less than its earned value',
					'PV and EV must be measured in different currencies',
					'The program is forecast to finish early without any cost impact'
				],
				correctIndex: 1,
				explanation:
					'SV = EV − PV is negative (schedule slip in value terms). CV = EV − AC is positive (favorable cost variance for work performed). Both can coexist.'
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
			}
		]
	}
];
