'use client';

import { useMemo, useState } from 'react';
import { calculateEvmsMetrics } from '@/lib/evms/calculations';
import { metricsLiteracyScenarios } from '@/lib/threads/metricsLiteracyScenarios';
import { EvmsMetricsDashboard } from './EvmsMetricsDashboard';

export function MetricsLiteracyThread({ onBack }: { onBack: () => void }) {
	const [scenarioIndex, setScenarioIndex] = useState(0);
	const [questionIndex, setQuestionIndex] = useState(0);
	const [picked, setPicked] = useState<number | null>(null);
	const [showFeedback, setShowFeedback] = useState(false);

	const scenario = metricsLiteracyScenarios[scenarioIndex];
	const question = scenario?.questions[questionIndex];

	const metrics = useMemo(
		() =>
			scenario ? calculateEvmsMetrics({ pv: scenario.pv, ev: scenario.ev, ac: scenario.ac, bac: scenario.bac }) : null,
		[scenario]
	);

	const atLastQuestion = scenario && questionIndex >= scenario.questions.length - 1;
	const atLastScenario = scenarioIndex >= metricsLiteracyScenarios.length - 1;

	function pickOption(i: number) {
		if (showFeedback) return;
		setPicked(i);
	}

	function checkAnswer() {
		if (picked == null || !question || showFeedback) return;
		setShowFeedback(true);
	}

	function advance() {
		if (!scenario || !showFeedback) return;
		if (questionIndex < scenario.questions.length - 1) {
			setQuestionIndex((i) => i + 1);
			setPicked(null);
			setShowFeedback(false);
			return;
		}
		if (scenarioIndex < metricsLiteracyScenarios.length - 1) {
			setScenarioIndex((i) => i + 1);
			setQuestionIndex(0);
			setPicked(null);
			setShowFeedback(false);
			return;
		}
		finishAll();
	}

	function finishAll() {
		setScenarioIndex(0);
		setQuestionIndex(0);
		setPicked(null);
		setShowFeedback(false);
		onBack();
	}

	function handleBack() {
		setScenarioIndex(0);
		setQuestionIndex(0);
		setPicked(null);
		setShowFeedback(false);
		onBack();
	}

	if (!scenario || !question || !metrics) return null;

	return (
		<div className="flex min-h-[50vh] flex-col gap-4">
			<header className="flex items-center gap-3 border-b border-border pb-3">
				<button
					type="button"
					className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-ink-1 hover:border-accent hover:text-accent"
					onClick={handleBack}
					aria-label="Back to learning paths"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
						<path d="M19 12H5M12 19l-7-7 7-7" />
					</svg>
				</button>
				<div>
					<h2 className="m-0 text-xl font-bold text-ink-1">Read the metrics</h2>
					<p className="mt-1 text-sm text-ink-2">
						Case {scenario.id} of {metricsLiteracyScenarios.length} · Question {questionIndex + 1} of{' '}
						{scenario.questions.length}
					</p>
				</div>
			</header>

			<div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,20rem)_1fr]">
				<aside className="lg:sticky lg:top-4 lg:self-start">
					<EvmsMetricsDashboard metrics={metrics} bac={scenario.bac} />
				</aside>
				<div>
					<div className="mb-4 rounded-xl border border-border bg-surface-2 p-4 sm:p-5">
						<h3 className="m-0 text-lg font-bold text-ink-1">{scenario.title}</h3>
						<p className="mt-1 text-sm font-semibold text-accent">{scenario.subtitle}</p>
						<p className="mt-3 text-sm leading-relaxed text-ink-2">{scenario.narrative}</p>
					</div>
					<article className="rounded-xl border border-border bg-surface-2 p-4 sm:p-6">
						{question.managerQuote ? (
							<blockquote className="mb-4 border-l-4 border-warning bg-amber-50/80 px-4 py-3 text-sm italic leading-relaxed text-ink-1">
								<span className="mb-2 block text-xs font-bold uppercase tracking-wide not-italic text-ink-3">
									Program manager says
								</span>
								{question.managerQuote}
							</blockquote>
						) : null}
						<p className="m-0 mb-4 text-base font-semibold leading-snug text-ink-1">{question.prompt}</p>
						<div className="mb-4 flex flex-col gap-2">
							{question.options.map((label, i) => {
								const isCorrect = showFeedback && i === question.correctIndex;
								const isWrong = showFeedback && picked === i && i !== question.correctIndex;
								const isSelected = picked === i && !showFeedback;
								let optionClass =
									'rounded-lg border-2 border-border bg-surface-1 px-3 py-3 text-left text-sm text-ink-1 hover:border-accent';
								if (isCorrect) optionClass = 'rounded-lg border-2 border-success bg-success-muted px-3 py-3 text-left text-sm text-ink-1';
								else if (isWrong) optionClass = 'rounded-lg border-2 border-danger bg-red-50 px-3 py-3 text-left text-sm text-ink-1';
								else if (isSelected) optionClass = 'rounded-lg border-2 border-accent bg-accent-muted px-3 py-3 text-left text-sm text-ink-1';
								return (
									<button
										key={label}
										type="button"
										className={optionClass}
										disabled={showFeedback}
										onClick={() => pickOption(i)}
									>
										{label}
									</button>
								);
							})}
						</div>
						{showFeedback ? (
							<p className="mb-4 rounded-lg border-l-4 border-accent bg-surface-1 p-3 text-sm leading-relaxed text-ink-2" role="status">
								{question.explanation}
							</p>
						) : null}
						<div className="flex flex-wrap gap-3">
							<button
								type="button"
								className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45"
								onClick={checkAnswer}
								disabled={picked == null || showFeedback}
							>
								Check answer
							</button>
							<button
								type="button"
								className="rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-semibold text-ink-2 disabled:cursor-not-allowed disabled:opacity-35"
								onClick={advance}
								disabled={!showFeedback}
							>
								{atLastQuestion && atLastScenario ? 'Finish' : atLastQuestion ? 'Next case' : 'Next question'}
							</button>
						</div>
					</article>
				</div>
			</div>
		</div>
	);
}
