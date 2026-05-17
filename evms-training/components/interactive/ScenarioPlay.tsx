'use client';

import { useEffect, useRef, useState } from 'react';
import { getPerformanceIndicator, summarizeScenarioComplete } from '@/lib/evms/calculations';
import { getScenario } from '@/lib/scenarios/index';
import type { useGameStore } from '@/hooks/useGameStore';
import type { useBeadsStore } from '@/hooks/useBeadsStore';
import { EvmsMetricsDashboard } from './EvmsMetricsDashboard';

const CHOICE_REVEAL_DELAY_MS = 400;

type Game = ReturnType<typeof useGameStore>;
type Beads = ReturnType<typeof useBeadsStore>;

export function ScenarioPlay({
	scenarioId,
	game,
	beads,
	onBack
}: {
	scenarioId: number;
	game: Game;
	beads: Beads;
	onBack: () => void;
}) {
	const scenario = getScenario(scenarioId);
	const [choicesRevealReady, setChoicesRevealReady] = useState(true);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const turn = scenario ? scenario.turns[game.turnIndex] : undefined;
	const isLastTurn = scenario && game.turnIndex >= scenario.turns.length;

	useEffect(() => {
		setChoicesRevealReady(true);
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, [scenarioId]);

	function clearRevealTimer() {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}

	function scheduleChoicesReveal() {
		setChoicesRevealReady(false);
		clearRevealTimer();
		timerRef.current = setTimeout(() => {
			timerRef.current = null;
			setChoicesRevealReady(true);
			if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
				document.activeElement.blur();
			}
		}, CHOICE_REVEAL_DELAY_MS);
	}

	if (!scenario) return null;

	const sc = scenario;

	const completeSummary =
		isLastTurn && game.metrics
			? summarizeScenarioComplete(game.metrics, { plannedDurationDays: sc.plannedDurationDays })
			: null;

	const scheduleSummaryIndicator = game.metrics ? getPerformanceIndicator(game.metrics.spi, 'index') : null;

	let budgetSummaryIndicator: string | null = null;
	if (game.metrics) {
		const c = getPerformanceIndicator(game.metrics.cpi, 'index');
		const v = getPerformanceIndicator(game.metrics.vac, 'variance');
		if (c === 'bad' || v === 'bad') budgetSummaryIndicator = 'bad';
		else if (c === 'warning' || v === 'warning') budgetSummaryIndicator = 'warning';
		else budgetSummaryIndicator = 'good';
	}

	function handleChoice(choice: {
		text: string;
		pvDelta?: number;
		evDelta?: number;
		acDelta?: number;
		feedback?: string;
	}) {
		game.selectChoice(choice);
	}

	function handleNext() {
		const wasLastTurn = game.turnIndex >= sc.turns.length - 1;
		game.advanceAfterFeedback();
		if (wasLastTurn) {
			clearRevealTimer();
			setChoicesRevealReady(true);
			beads.completeBead(scenarioId);
			return;
		}
		scheduleChoicesReveal();
	}

	function handleBack() {
		clearRevealTimer();
		setChoicesRevealReady(true);
		game.resetGame();
		onBack();
	}

	return (
		<div className="flex min-h-[60vh] flex-col gap-4">
			<header className="flex items-center gap-3 border-b border-border pb-3">
				<button
					type="button"
					className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2 text-ink-1 hover:border-accent hover:text-accent"
					onClick={handleBack}
					aria-label="Back to scenarios"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
						<path d="M19 12H5M12 19l-7-7 7-7" />
					</svg>
				</button>
				<div>
					<h2 className="m-0 text-xl font-bold text-ink-1">{sc.title}</h2>
					<p className="mt-1 text-sm text-ink-2">
						{isLastTurn ? 'All turns complete' : `Turn ${game.turnIndex + 1} of ${sc.turns.length}`}
					</p>
				</div>
			</header>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,20rem)_1fr]">
				<aside className="lg:sticky lg:top-4 lg:self-start">
					<EvmsMetricsDashboard metrics={game.metrics} bac={sc.bac} />
				</aside>
				<main>
					{isLastTurn ? (
						<div className="rounded-xl border border-border bg-surface-2 p-6 text-center">
							<div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-success text-2xl text-white">
								✓
							</div>
							<h3 className="text-xl font-bold text-ink-1">Scenario Complete!</h3>
							<p className="mt-2 text-ink-2">
								You&apos;ve finished &quot;{sc.title}&quot;. Review your final EVMS metrics in the panel.
							</p>
							{completeSummary ? (
								<section className="mt-6 text-left" aria-labelledby="complete-summary-title">
									<h4 id="complete-summary-title" className="text-base font-bold text-ink-1">
										How you did
									</h4>
									<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
										<article
											className={`rounded-lg border border-border bg-surface-1 p-4 ${
												scheduleSummaryIndicator === 'good'
													? 'border-l-4 border-l-success'
													: scheduleSummaryIndicator === 'warning'
														? 'border-l-4 border-l-warning'
														: 'border-l-4 border-l-danger'
											}`}
										>
											<h5 className="m-0 text-sm font-bold text-ink-1">Schedule</h5>
											<p className="mt-2 text-sm font-medium text-ink-1">{completeSummary.scheduleLede}</p>
											<p className="mt-1 text-xs leading-relaxed text-ink-2">{completeSummary.scheduleDetail}</p>
										</article>
										<article
											className={`rounded-lg border border-border bg-surface-1 p-4 ${
												budgetSummaryIndicator === 'good'
													? 'border-l-4 border-l-success'
													: budgetSummaryIndicator === 'warning'
														? 'border-l-4 border-l-warning'
														: 'border-l-4 border-l-danger'
											}`}
										>
											<h5 className="m-0 text-sm font-bold text-ink-1">Budget &amp; forecast</h5>
											<p className="mt-2 text-xs leading-relaxed text-ink-2">{completeSummary.costWork}</p>
											<p className="mt-1 text-xs leading-relaxed text-ink-2">{completeSummary.forecast}</p>
										</article>
									</div>
								</section>
							) : null}
							<button
								type="button"
								className="mt-6 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:brightness-105"
								onClick={handleBack}
							>
								Return to Scenarios
							</button>
						</div>
					) : turn ? (
						<div className="narrative-card rounded-xl border border-border bg-surface-2 p-5">
							<p className="m-0 text-base leading-relaxed text-ink-1">{turn.narrative}</p>
							{game.awaitingAdvance ? (
								<>
									{game.feedback ? (
										<div className="mt-4 rounded-lg bg-surface-1 p-3 text-sm text-ink-2">
											<strong className="text-ink-1">Outcome:</strong> {game.feedback}
										</div>
									) : null}
									<button
										type="button"
										className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white"
										onClick={handleNext}
										aria-label="Continue to next decision"
									>
										Next
									</button>
								</>
							) : choicesRevealReady ? (
								<div className="mt-4 flex flex-col gap-2">
									{turn.choices.map((choice: (typeof turn.choices)[number], idx: number) => (
										<button
											key={idx}
											type="button"
											className="choice-btn rounded-lg border-2 border-border bg-surface-1 px-4 py-3 text-left text-sm font-medium text-ink-1 hover:border-accent"
											onClick={() => handleChoice(choice)}
										>
											{choice.text}
										</button>
									))}
								</div>
							) : (
								<p className="mt-4 text-sm text-ink-2" aria-live="polite">
									Loading next decision…
								</p>
							)}
						</div>
					) : null}
				</main>
			</div>
		</div>
	);
}
