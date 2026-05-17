/**
 * EVMS Training Scenarios - 10 real-life inspired choose-your-own-adventure scenarios
 * Each scenario has turns with decisions that affect EVMS metrics
 */
// @ts-nocheck
// Helper to create a turn/decision
function turn(id, narrative, choices, pvDelta = 0, evDelta = 0, acDelta = 0) {
	return {
		id,
		narrative,
		choices: choices.map((c) => ({
			...c,
			pvDelta: c.pvDelta ?? pvDelta,
			evDelta: c.evDelta ?? evDelta,
			acDelta: c.acDelta ?? acDelta
		}))
	};
}

export const scenarios = [
	// ========== SCENARIO 1: Building a Fence (Easy) ==========
	{
		id: 1,
		title: 'Building a Fence',
		subtitle: 'Residential backyard project',
		difficulty: 1,
		bac: 2500,
		duration: '5 days',
		plannedDurationDays: 5,
		basis: 'NAHB home improvement benchmarks',
		turns: [
			turn(
				't1',
				"Day 1: You're building a 100-foot wooden fence. The materials (posts, rails, pickets) arrive. You planned to set all posts today. What do you do?",
				[
					{
						text: 'Set posts as planned - proceed methodically',
						evDelta: 500,
						pvDelta: 500,
						acDelta: 450,
						feedback: 'On track! Materials were slightly cheaper than estimated.'
					},
					{
						text: 'Rush through post setting to get ahead',
						evDelta: 400,
						pvDelta: 500,
						acDelta: 520,
						feedback: 'Rushing caused 2 posts to be misaligned - rework needed.'
					}
				]
			),
			turn(
				't2',
				'Day 2: Half the posts are set. Weather forecast shows rain in 2 days. Your plan was to attach rails today.',
				[
					{
						text: 'Continue with rails - stick to the plan',
						evDelta: 500,
						pvDelta: 500,
						acDelta: 500,
						feedback: 'Steady progress. EV matches PV.'
					},
					{
						text: 'Accelerate and add pickets to beat the rain',
						evDelta: 600,
						pvDelta: 500,
						acDelta: 650,
						feedback: 'Ahead of schedule but over budget - overtime labor.'
					}
				]
			),
			turn(
				't3',
				'Day 3: Rain arrived early. You can work in light rain or wait. Planned: finish rails and start pickets.',
				[
					{
						text: 'Work in light rain with proper gear',
						evDelta: 500,
						pvDelta: 500,
						acDelta: 480,
						feedback: 'Productive day. Slight cost savings.'
					},
					{
						text: 'Wait for clear weather - lose the day',
						evDelta: 0,
						pvDelta: 500,
						acDelta: 0,
						feedback: 'Schedule slip. SV negative - behind schedule.'
					}
				]
			),
			turn(
				't4',
				'Day 4: Clear skies. You need to catch up. 60% of fence is done. Plan was 80% complete.',
				[
					{
						text: 'Double down - work extended hours',
						evDelta: 700,
						pvDelta: 500,
						acDelta: 620,
						feedback: 'Caught up! SPI improved. Slight cost increase.'
					},
					{
						text: 'Pace normally - accept the delay',
						evDelta: 500,
						pvDelta: 500,
						acDelta: 500,
						feedback: 'Consistent pace. Will finish Day 6 instead of Day 5.'
					}
				]
			),
			turn(
				't5',
				'Day 5 (or 6): Final section. One option: premium stain adds $200 but extends fence life 5 years.',
				[
					{
						text: 'Use standard stain - stay within BAC',
						evDelta: 300,
						pvDelta: 500,
						acDelta: 280,
						feedback: 'Project complete! Within budget. CV positive.'
					},
					{
						text: 'Upgrade to premium stain',
						evDelta: 300,
						pvDelta: 500,
						acDelta: 480,
						feedback: 'Complete but over BAC. Scope creep - VAC negative.'
					}
				]
			)
		]
	},

	// ========== SCENARIO 2: Kitchen Renovation ==========
	{
		id: 2,
		title: 'Kitchen Renovation',
		subtitle: 'Full remodel with plumbing & electrical',
		difficulty: 2,
		bac: 35000,
		duration: '6 weeks',
		plannedDurationDays: 42,
		basis: 'Home renovation industry benchmarks',
		turns: [
			turn(
				't1',
				'Week 1: Demo complete. Electrician finds outdated wiring - not to code. Re-wire adds $4,000. Your planned value: $5,833.',
				[
					{
						text: 'Do the re-wire - safety first',
						evDelta: 5500,
						pvDelta: 5833,
						acDelta: 6500,
						feedback: 'Necessary change. CV negative. Document as change order.'
					},
					{
						text: 'Patch and proceed - risk the inspection',
						evDelta: 5833,
						pvDelta: 5833,
						acDelta: 5833,
						feedback: 'Risky. May fail inspection later at higher cost.'
					}
				]
			),
			turn(
				't2',
				'Week 2: Plumbing rough-in. Supplier has cabinet delays - 2 week slip. You can switch suppliers for +$800.',
				[
					{
						text: 'Switch suppliers - maintain schedule',
						evDelta: 5833,
						pvDelta: 5833,
						acDelta: 6633,
						feedback: 'Schedule preserved. CPI slightly down.'
					},
					{
						text: 'Wait for original cabinets',
						evDelta: 4500,
						pvDelta: 5833,
						acDelta: 4500,
						feedback: 'SV negative. Behind schedule. SPI < 1.'
					}
				]
			),
			turn(
				't3',
				'Week 3: Countertop template. Homeowner wants granite upgrade (+$2,500). Current EV on track.',
				[
					{
						text: 'Approve upgrade - document change',
						evDelta: 5833,
						pvDelta: 5833,
						acDelta: 7333,
						feedback: 'Scope increase. BAC should be revised.'
					},
					{
						text: 'Stay with quartz - control scope',
						evDelta: 5833,
						pvDelta: 5833,
						acDelta: 5833,
						feedback: 'Scope control. EV = PV = AC. Perfect performance.'
					}
				]
			),
			turn(
				't4',
				'Week 4: Cabinet installation. One cabinet damaged in transport. Replace = 5 days, repair = 2 days but visible flaw.',
				[
					{
						text: 'Replace - quality matters',
						evDelta: 5000,
						pvDelta: 5833,
						acDelta: 6200,
						feedback: 'Schedule impact. SV and CV both negative.'
					},
					{
						text: 'Repair and install',
						evDelta: 5833,
						pvDelta: 5833,
						acDelta: 6100,
						feedback: 'On schedule. Slight overrun on repair labor.'
					}
				]
			),
			turn(
				't5',
				'Week 5: Appliances delivered. Wrong fridge - correct one in 10 days. Use loaner or wait?',
				[
					{
						text: 'Use loaner - finish on time',
						evDelta: 5833,
						pvDelta: 5833,
						acDelta: 5900,
						feedback: 'Creative solution. Minor cost for loaner.'
					},
					{
						text: 'Wait for correct fridge',
						evDelta: 4000,
						pvDelta: 5833,
						acDelta: 4000,
						feedback: 'Schedule slip. EAC will increase (extended overhead).'
					}
				]
			),
			turn(
				't6',
				'Week 6: Final punch list. Minor items: paint touch-up, grout seal. 95% complete per plan.',
				[
					{
						text: 'Complete all punch items',
						evDelta: 2917,
						pvDelta: 2917,
						acDelta: 2850,
						feedback: 'Project complete! Final CPI/SPI calculated.'
					},
					{
						text: 'Close out - defer touch-up',
						evDelta: 2917,
						pvDelta: 2917,
						acDelta: 2500,
						feedback: 'Under budget but incomplete scope. EV < planned deliverables.'
					}
				]
			)
		]
	},

	// ========== SCENARIO 3: Software Feature Sprint ==========
	{
		id: 3,
		title: 'Software Feature Sprint',
		subtitle: 'Agile 2-week sprint - User auth module',
		difficulty: 3,
		bac: 40000,
		duration: '2 weeks',
		plannedDurationDays: 14,
		basis: 'CHAOS Report, Agile EVM adaptations',
		turns: [
			turn(
				't1',
				'Sprint Day 1-2: Backend auth API stories in progress. Discover OAuth library has critical CVE. Refactor now or after sprint?',
				[
					{
						text: 'Refactor now - security first',
						evDelta: 8000,
						pvDelta: 20000,
						acDelta: 12000,
						feedback: 'Technical debt paid. CV negative. SPI low.'
					},
					{
						text: 'Document and defer - deliver planned scope',
						evDelta: 18000,
						pvDelta: 20000,
						acDelta: 18000,
						feedback: 'Velocity maintained. Technical debt created.'
					}
				]
			),
			turn(
				't2',
				'Day 3-4: QA finds 8 critical bugs. Fix all or ship with known issues? Plan: 50% EV at midpoint.',
				[
					{
						text: 'Fix all before continuing',
						evDelta: 10000,
						pvDelta: 20000,
						acDelta: 15000,
						feedback: 'Quality gate. EV lags PV. Schedule at risk.'
					},
					{
						text: 'Fix P0 only - ship rest next sprint',
						evDelta: 18000,
						pvDelta: 20000,
						acDelta: 12000,
						feedback: 'Pragmatic. EV close to PV. CPI good.'
					}
				]
			),
			turn(
				't3',
				'Day 5-7: Frontend integration. Designer requests UX changes. 2 days of rework.',
				[
					{
						text: 'Implement UX changes',
						evDelta: 15000,
						pvDelta: 20000,
						acDelta: 18000,
						feedback: 'Scope creep mid-sprint. AC exceeds EV.'
					},
					{
						text: 'Log for next sprint - ship as is',
						evDelta: 20000,
						pvDelta: 20000,
						acDelta: 16000,
						feedback: 'Sprint goal met. CV positive. Good CPI.'
					}
				]
			),
			turn(
				't4',
				'Day 8-10: Sprint demo. Product owner adds "nice to have". Sprint end.',
				[
					{
						text: 'Add to backlog - sprint complete',
						evDelta: 20000,
						pvDelta: 20000,
						acDelta: 20000,
						feedback: 'Sprint 100% complete. EV=PV=AC. Perfect.'
					},
					{
						text: 'Squeeze it in - overtime',
						evDelta: 22000,
						pvDelta: 20000,
						acDelta: 24000,
						feedback: 'Over-delivered but over budget. Burnout risk.'
					}
				]
			)
		]
	},

	// ========== SCENARIO 4: Marketing Campaign Launch ==========
	{
		id: 4,
		title: 'Marketing Campaign Launch',
		subtitle: 'Multi-channel product launch',
		difficulty: 4,
		bac: 150000,
		duration: '8 weeks',
		plannedDurationDays: 56,
		basis: 'PMI marketing project studies',
		turns: [
			turn('t1', 'Week 1: Creative brief approved. Agency proposes 3 concepts. Pick 1 or run A/B?', [
				{ text: 'Single concept - faster', evDelta: 18750, pvDelta: 18750, acDelta: 18500, feedback: 'On track.' },
				{ text: 'A/B test concepts', evDelta: 15000, pvDelta: 18750, acDelta: 22000, feedback: 'Delay + cost. SV/CV negative.' }
			]),
			turn('t2', 'Week 2: Viral trend emerges. Pivot creative to capitalize? Adds 1 week.', [
				{ text: 'Pivot - opportunity cost', evDelta: 20000, pvDelta: 18750, acDelta: 25000, feedback: 'Schedule slip. Higher engagement potential.' },
				{ text: 'Stay course', evDelta: 18750, pvDelta: 18750, acDelta: 18750, feedback: 'Stable. EV=PV.' }
			]),
			turn('t3', 'Week 3-4: Media buy. CPM 20% higher than planned. Reduce reach or increase budget?', [
				{ text: 'Increase budget', evDelta: 37500, pvDelta: 37500, acDelta: 45000, feedback: 'CV negative. EAC rises.' },
				{ text: 'Reduce reach', evDelta: 31250, pvDelta: 37500, acDelta: 37500, feedback: 'EV<PV. Scope reduction.' }
			]),
			turn('t4', 'Week 5: Launch event. Venue cancellation. Virtual pivot or find new venue (2 wk delay)?', [
				{ text: 'Go virtual', evDelta: 18750, pvDelta: 18750, acDelta: 12000, feedback: 'Under budget. Different deliverable.' },
				{ text: 'New venue', evDelta: 12000, pvDelta: 18750, acDelta: 22000, feedback: 'Delay + cost. SPI/CPI suffer.' }
			]),
			turn('t5', 'Week 6: Influencer drops out. Backup has 50% reach. Proceed or find replacement?', [
				{ text: 'Use backup', evDelta: 18750, pvDelta: 18750, acDelta: 15000, feedback: 'Scope reduction. Under budget.' },
				{ text: 'Find replacement', evDelta: 15000, pvDelta: 18750, acDelta: 25000, feedback: 'Delay + premium rate.' }
			]),
			turn('t6', 'Week 7: Analytics show underperformance. Double down on paid or cut losses?', [
				{ text: 'Double down', evDelta: 18750, pvDelta: 18750, acDelta: 35000, feedback: 'AC spike. VAC at risk.' },
				{ text: 'Cut losses', evDelta: 18750, pvDelta: 18750, acDelta: 10000, feedback: 'Under budget. Lower ROI.' }
			]),
			turn('t7', 'Week 8: Campaign wrap. Final reporting. Under BAC due to pivots.', [
				{ text: 'Full report', evDelta: 18750, pvDelta: 18750, acDelta: 15000, feedback: 'Complete. Document lessons learned.' },
				{ text: 'Executive summary only', evDelta: 15000, pvDelta: 18750, acDelta: 12000, feedback: 'Reduced scope. EV<PV at close.' }
			])
		]
	},

	// ========== SCENARIO 5: Office Relocation ==========
	{
		id: 5,
		title: 'Office Relocation',
		subtitle: '200-person move with IT infrastructure',
		difficulty: 5,
		bac: 500000,
		duration: '12 weeks',
		plannedDurationDays: 84,
		basis: 'Facility management case studies',
		turns: [
			turn('t1', 'Week 1-2: Floor plan finalized. Building has asbestos in ceiling. Abatement adds $45K, 2 weeks.', [
				{ text: 'Abate before move', evDelta: 60000, pvDelta: 83333, acDelta: 105000, feedback: 'Regulatory. EAC revised.' },
				{ text: 'Seal and defer', evDelta: 83333, pvDelta: 83333, acDelta: 83333, feedback: 'Risk. Future liability.' }
			]),
			turn('t2', 'Week 3: IT cabling. New building has insufficient conduit. Trench or surface-mount?', [
				{ text: 'Trench - clean look', evDelta: 83333, pvDelta: 83333, acDelta: 95000, feedback: 'Quality. CV negative.' },
				{ text: 'Surface mount', evDelta: 75000, pvDelta: 83333, acDelta: 70000, feedback: 'Faster, cheaper. EV<PV.' }
			]),
			turn('t3', 'Week 4-5: Furniture. Supplier bankruptcy. Switch to premium vendor (+$80K) or discount (+4 weeks)?', [
				{ text: 'Premium vendor', evDelta: 83333, pvDelta: 83333, acDelta: 130000, feedback: 'Schedule preserved. Cost spike.' },
				{ text: 'Discount vendor', evDelta: 60000, pvDelta: 83333, acDelta: 60000, feedback: 'Delay. SPI drops.' }
			]),
			turn('t4', 'Week 6: Phased move plan. Departments want to move together. Stagger or big bang?', [
				{ text: 'Phased - 4 weekends', evDelta: 83333, pvDelta: 83333, acDelta: 85000, feedback: 'Managed risk. Slight overrun.' },
				{ text: 'Big bang', evDelta: 90000, pvDelta: 83333, acDelta: 120000, feedback: 'Faster EV. Higher AC. Overtime.' }
			]),
			turn('t5', 'Week 8: 60% moved. Network issues at new site. Vendor says 1 week fix.', [
				{ text: 'Wait for fix', evDelta: 60000, pvDelta: 83333, acDelta: 60000, feedback: 'Productivity loss. SV negative.' },
				{ text: 'Temporary solution', evDelta: 83333, pvDelta: 83333, acDelta: 95000, feedback: 'Keep schedule. Extra cost.' }
			]),
			turn('t6', 'Week 10: Punch list. Old building lease ends Week 12. Cleaning dispute with landlord.', [
				{ text: 'Professional clean', evDelta: 83333, pvDelta: 83333, acDelta: 45000, feedback: 'Avoid penalty. On track.' },
				{ text: 'DIY clean', evDelta: 83333, pvDelta: 83333, acDelta: 35000, feedback: 'Savings. Retention risk.' }
			]),
			turn('t7', 'Week 12: Final cutover. Old building empty. Project complete.', [
				{ text: 'Formal closeout', evDelta: 83336, pvDelta: 83337, acDelta: 82000, feedback: 'Complete. Document VAC.' },
				{ text: 'Operational handoff', evDelta: 83336, pvDelta: 83337, acDelta: 75000, feedback: 'Under budget. Lessons learned.' }
			])
		]
	},

	// ========== SCENARIO 6: Manufacturing Line Setup ==========
	{
		id: 6,
		title: 'Manufacturing Line Setup',
		subtitle: 'New assembly line for consumer electronics',
		difficulty: 6,
		bac: 2000000,
		duration: '6 months',
		plannedDurationDays: 183,
		basis: 'Industrial project management research',
		turns: [
			turn('t1', 'Month 1: Equipment procurement. Lead time extended 6 weeks. Air freight for +$120K?', [
				{ text: 'Air freight', evDelta: 333333, pvDelta: 333333, acDelta: 453333, feedback: 'Schedule preserved. CPI down.' },
				{ text: 'Wait for ocean', evDelta: 200000, pvDelta: 333333, acDelta: 200000, feedback: 'SV negative. Critical path impact.' }
			]),
			turn('t2', 'Month 2: Facility prep. Foundation specs wrong. Remediation $180K.', [
				{ text: 'Remediate', evDelta: 300000, pvDelta: 333333, acDelta: 480000, feedback: 'Technical necessity. EAC rises.' },
				{ text: 'Work around', evDelta: 333333, pvDelta: 333333, acDelta: 350000, feedback: 'Risk. Long-term reliability.' }
			]),
			turn('t3', 'Month 3: Automation install. Integration issues with ERP. Vendor upgrade $95K.', [
				{ text: 'Upgrade', evDelta: 333333, pvDelta: 333333, acDelta: 428333, feedback: 'Scope increase. Document.' },
				{ text: 'Custom middleware', evDelta: 280000, pvDelta: 333333, acDelta: 320000, feedback: 'Delay. SPI<1.' }
			]),
			turn('t4', 'Month 4: Staff training. Retention issue - competitors poaching. Retention bonus program?', [
				{ text: 'Retention program', evDelta: 333333, pvDelta: 333333, acDelta: 383333, feedback: 'Human capital investment.' },
				{ text: 'Standard training', evDelta: 333333, pvDelta: 333333, acDelta: 333333, feedback: 'On plan. Turnover risk.' }
			]),
			turn('t5', 'Month 5: Pilot run. Yield 78% vs 92% target. Equipment calibration or process redesign?', [
				{ text: 'Calibrate', evDelta: 333333, pvDelta: 333333, acDelta: 360000, feedback: 'Quick fix. May not hit 92%.' },
				{ text: 'Process redesign', evDelta: 250000, pvDelta: 333333, acDelta: 450000, feedback: 'Delay + cost. Better long-term.' }
			]),
			turn('t6', 'Month 6: Production ramp. Supply chain shortage. Premium supplier +$200K for materials.', [
				{ text: 'Premium supplier', evDelta: 333334, pvDelta: 333334, acDelta: 533334, feedback: 'Launch date met. VAC negative.' },
				{ text: 'Delay ramp', evDelta: 250000, pvDelta: 333334, acDelta: 250000, feedback: 'Revenue delay. EAC extends.' }
			])
		]
	},

	// ========== SCENARIO 7: Hospital Wing Expansion ==========
	{
		id: 7,
		title: 'Hospital Wing Expansion',
		subtitle: 'New patient wing with regulatory compliance',
		difficulty: 7,
		bac: 15000000,
		duration: '18 months',
		plannedDurationDays: 548,
		basis: 'Healthcare construction AHA benchmarks',
		turns: [
			turn('t1', 'Month 1-2: Design phase. Joint Commission requires additional egress. Redesign $400K.', [
				{ text: 'Implement redesign', evDelta: 1500000, pvDelta: 1666667, acDelta: 2066667, feedback: 'Compliance. CV negative.' },
				{ text: 'Value engineer', evDelta: 1300000, pvDelta: 1666667, acDelta: 1700000, feedback: 'Partial compliance. Audit risk.' }
			]),
			turn('t2', 'Month 3-4: MEP rough-in. HVAC for isolation rooms - spec upgrade. +$600K.', [
				{ text: 'Upgrade HVAC', evDelta: 1666667, pvDelta: 1666667, acDelta: 2266667, feedback: 'Patient safety. EAC rises.' },
				{ text: 'Standard spec', evDelta: 1666667, pvDelta: 1666667, acDelta: 1666667, feedback: 'On budget. Infection control risk.' }
			]),
			turn('t3', 'Month 5-6: Framing inspection failure. Fire-rated assemblies incorrect. Rework $350K.', [
				{ text: 'Full rework', evDelta: 1400000, pvDelta: 1666667, acDelta: 2016667, feedback: 'Schedule delay. SV negative.' },
				{ text: 'Patch and reinforce', evDelta: 1666667, pvDelta: 1666667, acDelta: 1850000, feedback: 'Faster. Warranty concerns.' }
			]),
			turn('t4', 'Month 7-9: Medical gas installation. FDA audit finding - documentation gap. 3-week remediation.', [
				{ text: 'Full remediation', evDelta: 1500000, pvDelta: 2500000, acDelta: 1800000, feedback: 'Regulatory. SPI drops.' },
				{ text: 'Expedited documentation', evDelta: 2200000, pvDelta: 2500000, acDelta: 2200000, feedback: 'Partial delay. Follow-up audit likely.' }
			]),
			turn('t5', 'Month 10-12: IT/Medical equipment. GE rollout delay. Alternative vendor compatibility unknown.', [
				{ text: 'Wait for GE', evDelta: 2000000, pvDelta: 2500000, acDelta: 2000000, feedback: 'Schedule slip. Known quantity.' },
				{ text: 'Alternative vendor', evDelta: 2400000, pvDelta: 2500000, acDelta: 2700000, feedback: 'Integration risk. Cost overrun.' }
			]),
			turn('t6', 'Month 13-15: Commissioning. Staff training backlog. Opening date at risk.', [
				{ text: 'Accelerated training', evDelta: 2500000, pvDelta: 2500000, acDelta: 2900000, feedback: 'Opening preserved. Overtime.' },
				{ text: 'Delay opening', evDelta: 2000000, pvDelta: 2500000, acDelta: 2000000, feedback: 'Revenue impact. Staff readiness.' }
			]),
			turn('t7', 'Month 16-18: Final inspections. State survey conditional approval. 2 items to resolve.', [
				{ text: 'Resolve before opening', evDelta: 2500000, pvDelta: 2500000, acDelta: 2600000, feedback: 'Clean opening. Full certification.' },
				{ text: 'Open with plan of correction', evDelta: 2500000, pvDelta: 2500000, acDelta: 2400000, feedback: 'Earlier revenue. Survey risk.' }
			])
		]
	},

	// ========== SCENARIO 8: Bridge Rehabilitation ==========
	{
		id: 8,
		title: 'Bridge Rehabilitation',
		subtitle: 'Civil engineering infrastructure',
		difficulty: 8,
		bac: 25000000,
		duration: '24 months',
		plannedDurationDays: 730,
		basis: 'DOT/FHWA project data',
		turns: [
			turn('t1', 'Month 1-3: Deck demolition. Hidden deck deterioration - 40% more removal. +$800K.', [
				{ text: 'Full demolition', evDelta: 2500000, pvDelta: 3125000, acDelta: 3925000, feedback: 'Condition discovered. EAC rises.' },
				{ text: 'Phased approach', evDelta: 2200000, pvDelta: 3125000, acDelta: 3100000, feedback: 'Extends schedule. SV negative.' }
			]),
			turn('t2', 'Month 4-6: Substructure repair. Underwater inspection finds scour. Cofferdam required.', [
				{ text: 'Cofferdam repair', evDelta: 3125000, pvDelta: 3125000, acDelta: 4500000, feedback: 'Critical repair. CV negative.' },
				{ text: 'Monitor and defer', evDelta: 3125000, pvDelta: 3125000, acDelta: 3200000, feedback: 'Risk. Potential failure.' }
			]),
			turn('t3', 'Month 7-9: Superstructure. Steel lead time 16 weeks. Design change to composite?', [
				{ text: 'Composite design', evDelta: 3125000, pvDelta: 3125000, acDelta: 3500000, feedback: 'Faster delivery. Cost increase.' },
				{ text: 'Wait for steel', evDelta: 2400000, pvDelta: 3125000, acDelta: 2400000, feedback: 'Schedule slip. SPI<1.' }
			]),
			turn('t4', 'Month 10-12: Traffic staging. DOT wants lane closure reduction. Phasing adds 4 months.', [
				{ text: 'Reduce closures', evDelta: 2600000, pvDelta: 3125000, acDelta: 2800000, feedback: 'Public impact minimized. Delay.' },
				{ text: 'Original staging', evDelta: 3125000, pvDelta: 3125000, acDelta: 3125000, feedback: 'On plan. Commuter impact.' }
			]),
			turn('t5', 'Month 13-15: Deck pour. Weather window missed. Winter work premium 35%.', [
				{ text: 'Winter work', evDelta: 3125000, pvDelta: 3125000, acDelta: 4218750, feedback: 'Schedule preserved. Cost spike.' },
				{ text: 'Spring pour', evDelta: 2500000, pvDelta: 3125000, acDelta: 2500000, feedback: '5-month delay. Lane closure extension.' }
			]),
			turn('t6', 'Month 18: NTP for approach work. Right-of-way dispute. Condemnation 6 months.', [
				{ text: 'Expedited condemnation', evDelta: 3125000, pvDelta: 3125000, acDelta: 3625000, feedback: 'Legal cost. Schedule preserved.' },
				{ text: 'Standard process', evDelta: 2000000, pvDelta: 3125000, acDelta: 2000000, feedback: 'Major delay. Critical path.' }
			]),
			turn('t7', 'Month 22-24: Final paving. Inspection hold. One weld repair required.', [
				{ text: 'Full repair', evDelta: 3125000, pvDelta: 3125000, acDelta: 3300000, feedback: 'Quality. Slight overrun.' },
				{ text: 'Expedited repair', evDelta: 3000000, pvDelta: 3125000, acDelta: 3100000, feedback: 'Earlier opening. Warranty risk.' }
			])
		]
	},

	// ========== SCENARIO 9: New Product Launch ==========
	{
		id: 9,
		title: 'New Product Launch',
		subtitle: 'Cross-functional product to market',
		difficulty: 9,
		bac: 5000000,
		duration: '12 months',
		plannedDurationDays: 365,
		basis: 'PDMA new product development',
		turns: [
			turn('t1', 'Month 1-2: R&D prototype. Material sourcing - single supplier for key component. Dual source +$180K?', [
				{ text: 'Dual source', evDelta: 700000, pvDelta: 833333, acDelta: 1013333, feedback: 'Supply chain resilience. CV negative.' },
				{ text: 'Single source', evDelta: 833333, pvDelta: 833333, acDelta: 833333, feedback: 'On plan. Supply risk.' }
			]),
			turn('t2', 'Month 3-4: Design freeze. Marketing wants feature add. 6-week delay, $250K.', [
				{ text: 'Add feature', evDelta: 600000, pvDelta: 833333, acDelta: 1083333, feedback: 'Scope creep. SV/CV negative.' },
				{ text: 'Freeze design', evDelta: 833333, pvDelta: 833333, acDelta: 833333, feedback: 'Discipline. Marketing alignment needed.' }
			]),
			turn('t3', 'Month 5-6: Manufacturing pilot. Yield 65%. Process capability study or run with contingency?', [
				{ text: 'Capability study', evDelta: 700000, pvDelta: 833333, acDelta: 950000, feedback: 'Quality focus. Delay + cost.' },
				{ text: 'Run with contingency', evDelta: 833333, pvDelta: 833333, acDelta: 900000, feedback: 'Launch date met. Scrap risk.' }
			]),
			turn('t4', 'Month 7-8: Regulatory submission. FDA requests additional data. 90-day response.', [
				{ text: 'Full response', evDelta: 700000, pvDelta: 833333, acDelta: 1100000, feedback: 'Compliance. EAC rises.' },
				{ text: 'Expedited response', evDelta: 800000, pvDelta: 833333, acDelta: 1200000, feedback: 'Consultants. Higher cost.' }
			]),
			turn('t5', 'Month 9: Sales enablement. Key account wants custom demo. Scope creep.', [
				{ text: 'Custom demo', evDelta: 833333, pvDelta: 833333, acDelta: 950000, feedback: 'Account relationship. Cost.' },
				{ text: 'Standard demo', evDelta: 833333, pvDelta: 833333, acDelta: 833333, feedback: 'On plan. Relationship risk.' }
			]),
			turn('t6', 'Month 10: Channel conflict. Existing product cannibalization. Pricing strategy shift?', [
				{ text: 'New pricing', evDelta: 833333, pvDelta: 833333, acDelta: 900000, feedback: 'Revenue impact. Margin analysis.' },
				{ text: 'Original pricing', evDelta: 833333, pvDelta: 833333, acDelta: 833333, feedback: 'Stable. Cannibalization.' }
			]),
			turn('t7', 'Month 11: Launch event. Competitor pre-announces. Move launch up 2 weeks?', [
				{ text: 'Accelerate launch', evDelta: 900000, pvDelta: 833333, acDelta: 1100000, feedback: 'Market position. Premium cost.' },
				{ text: 'Original date', evDelta: 833333, pvDelta: 833333, acDelta: 833333, feedback: 'Planned. Share risk.' }
			]),
			turn('t8', 'Month 12: Go-live. Support readiness 80%. Launch or delay?', [
				{ text: 'Launch', evDelta: 833334, pvDelta: 833334, acDelta: 800000, feedback: 'Revenue starts. Support risk.' },
				{ text: 'Delay 2 weeks', evDelta: 833334, pvDelta: 833334, acDelta: 850000, feedback: 'Support ready. Revenue delay.' }
			])
		]
	},

	// ========== SCENARIO 10: Lunar Mission Program ==========
	{
		id: 10,
		title: 'Lunar Mission Program',
		subtitle: 'Space program subsystem delivery',
		difficulty: 10,
		bac: 500000000,
		duration: '36 months',
		plannedDurationDays: 1095,
		basis: 'NASA EVM implementation ANSI-748',
		turns: [
			turn('t1', 'Month 1-3: PDR (Preliminary Design Review). Mass margin violated. Design iteration or material swap?', [
				{ text: 'Design iteration', evDelta: 35000000, pvDelta: 41666667, acDelta: 52000000, feedback: 'Technical correctness. CV negative.' },
				{ text: 'Material swap', evDelta: 40000000, pvDelta: 41666667, acDelta: 48000000, feedback: 'Faster. Qualification risk.' }
			]),
			turn('t2', 'Month 4-6: CDR. Thermal analysis shows margin breach. Redesign or accept risk?', [
				{ text: 'Redesign', evDelta: 35000000, pvDelta: 41666667, acDelta: 55000000, feedback: 'Mission success. SPI/CPI down.' },
				{ text: 'Accept risk', evDelta: 41666667, pvDelta: 41666667, acDelta: 41666667, feedback: 'Schedule preserved. SRR risk.' }
			]),
			turn('t3', 'Month 7-9: Long-lead procurement. Vendor quality escape. Source switch 4-month impact.', [
				{ text: 'Switch vendor', evDelta: 38000000, pvDelta: 41666667, acDelta: 50000000, feedback: 'Quality. Cost + partial delay.' },
				{ text: 'Vendor remediation', evDelta: 30000000, pvDelta: 41666667, acDelta: 40000000, feedback: 'Major delay. CPI ok.' }
			]),
			turn('t4', 'Month 10-12: Integration. Interface control document conflict with prime. Negotiation 6 weeks.', [
				{ text: 'Formal change', evDelta: 40000000, pvDelta: 41666667, acDelta: 48000000, feedback: 'Configuration control. Cost.' },
				{ text: 'Informal resolution', evDelta: 41666667, pvDelta: 41666667, acDelta: 42000000, feedback: 'Faster. Documentation risk.' }
			]),
			turn('t5', 'Month 13-15: Environmental testing. Vibe test failure. Root cause: workmanship.', [
				{ text: 'Full rework', evDelta: 35000000, pvDelta: 41666667, acDelta: 60000000, feedback: 'Quality. Major CV impact.' },
				{ text: 'Targeted repair', evDelta: 38000000, pvDelta: 41666667, acDelta: 50000000, feedback: 'Faster. Retest risk.' }
			]),
			turn('t6', 'Month 18: Integration with prime. Schedule pressure - skip optional tests?', [
				{ text: 'Full test suite', evDelta: 41666667, pvDelta: 41666667, acDelta: 45000000, feedback: 'Mission assurance. Slight overrun.' },
				{ text: 'Critical path only', evDelta: 41666667, pvDelta: 41666667, acDelta: 40000000, feedback: 'Schedule. In-flight risk.' }
			]),
			turn('t7', 'Month 21: NASA EVM surveillance. CPI 0.92. Recovery plan required. Overtime or descope?', [
				{ text: 'Overtime push', evDelta: 41666667, pvDelta: 41666667, acDelta: 50000000, feedback: 'Recovery attempt. Burnout risk.' },
				{ text: 'Strategic descope', evDelta: 38000000, pvDelta: 41666667, acDelta: 38000000, feedback: 'Controlled. Negotiate with customer.' }
			]),
			turn('t8', 'Month 27: Delivery milestone. One waver. Deliver or resolve?', [
				{ text: 'Resolve waver', evDelta: 38000000, pvDelta: 41666667, acDelta: 45000000, feedback: 'Clean delivery. Delay.' },
				{ text: 'Deliver with waver', evDelta: 41666667, pvDelta: 41666667, acDelta: 41666667, feedback: 'On time. Acceptance risk.' }
			]),
			turn('t9', 'Month 30: Acceptance testing. Anomaly in thermal vac. Root cause TBD.', [
				{ text: 'Full investigation', evDelta: 35000000, pvDelta: 41666667, acDelta: 55000000, feedback: 'Mission safety. EAC rises.' },
				{ text: 'Bounding analysis', evDelta: 40000000, pvDelta: 41666667, acDelta: 48000000, feedback: 'Faster closure. Residual risk.' }
			]),
			turn('t10', 'Month 33-36: Final delivery. Customer requests early delivery for integration. Incentive fee on table.', [
				{ text: 'Accelerate', evDelta: 41666667, pvDelta: 41666667, acDelta: 55000000, feedback: 'Fee captured. Cost spike.' },
				{ text: 'Contract schedule', evDelta: 41666667, pvDelta: 41666667, acDelta: 41666667, feedback: 'On plan. Fee forgone.' }
			])
		]
	}
];

export function getScenario(id) {
	return scenarios.find((s) => s.id === parseInt(id, 10));
}
