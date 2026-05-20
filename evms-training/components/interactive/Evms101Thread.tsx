'use client';

import { useState } from 'react';
import { evms101ExternalResources, evms101Lessons, evms101Quiz } from '@/lib/threads/evms101Content';

export function Evms101Thread({ onBack }: { onBack: () => void }) {
	const [phase, setPhase] = useState<'lessons' | 'quiz' | 'results'>('lessons');
	const [lessonIndex, setLessonIndex] = useState(0);
	const [quizIndex, setQuizIndex] = useState(0);
	const [picked, setPicked] = useState<number | null>(null);
	const [showQuizFeedback, setShowQuizFeedback] = useState(false);
	const [correctCount, setCorrectCount] = useState(0);

	const totalLessons = evms101Lessons.length;
	const totalQuiz = evms101Quiz.length;
	const lesson = evms101Lessons[lessonIndex];
	const quizItem = evms101Quiz[quizIndex];

	function restartFromTop() {
		setPhase('lessons');
		setLessonIndex(0);
		setQuizIndex(0);
		setPicked(null);
		setShowQuizFeedback(false);
		setCorrectCount(0);
	}

	function handleBack() {
		restartFromTop();
		onBack();
	}

	function goLessonsPrev() {
		setLessonIndex((i) => Math.max(0, i - 1));
	}

	function goLessonsNext() {
		if (lessonIndex >= totalLessons - 1) {
			setPhase('quiz');
			setQuizIndex(0);
			setPicked(null);
			setShowQuizFeedback(false);
			setCorrectCount(0);
			return;
		}
		setLessonIndex((i) => i + 1);
	}

	function pickOption(i: number) {
		if (showQuizFeedback) return;
		setPicked(i);
	}

	function checkAnswer() {
		if (picked == null || showQuizFeedback || !quizItem) return;
		setShowQuizFeedback(true);
		if (picked === quizItem.correctIndex) {
			setCorrectCount((c) => c + 1);
		}
	}

	function nextQuiz() {
		if (!showQuizFeedback) return;
		if (quizIndex >= totalQuiz - 1) {
			setPhase('results');
			return;
		}
		setQuizIndex((i) => i + 1);
		setPicked(null);
		setShowQuizFeedback(false);
	}

	return (
		<div className="flex min-h-[50vh] flex-col gap-4">
			<header className="flex items-center gap-3 border-b border-border pb-3">
				<button
					type="button"
					className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2 hover:border-accent hover:text-accent"
					onClick={handleBack}
					aria-label="Back to learning paths"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
						<path d="M19 12H5M12 19l-7-7 7-7" />
					</svg>
				</button>
				<div>
					<h2 className="m-0 text-xl font-bold text-ink-1">EVMS 101</h2>
					<p className="mt-1 text-sm text-ink-2">
						{phase === 'lessons'
							? `Lesson ${lessonIndex + 1} of ${totalLessons}`
							: phase === 'quiz'
								? `Quiz question ${quizIndex + 1} of ${totalQuiz}`
								: 'Quiz complete'}
					</p>
				</div>
			</header>

			{phase === 'lessons' && lesson ? (
				<article className="max-w-3xl rounded-xl border border-border bg-surface-2 p-6">
					<h3 className="m-0 mb-3 text-lg font-bold text-ink-1">{lesson.title}</h3>
					<div
						className="mb-6 max-w-none text-base leading-relaxed text-ink-2 [&_br]:block [&_strong]:font-semibold [&_strong]:text-ink-1"
						dangerouslySetInnerHTML={{ __html: lesson.body }}
					/>
					{'showResources' in lesson && lesson.showResources ? (
						<section className="mb-6 rounded-lg border border-border bg-surface-1 p-4" aria-labelledby="evms101-res-title">
							<h4 id="evms101-res-title" className="m-0 text-xs font-bold uppercase tracking-wide text-ink-1">
								Further reading
							</h4>
							<ul className="mt-2 list-disc pl-5 text-sm text-ink-2">
								{evms101ExternalResources.map((link) => (
									<li key={link.href}>
										<a className="font-semibold text-accent hover:underline" href={link.href} target="_blank" rel="noopener noreferrer">
											{link.label}
										</a>
										{link.note ? <span className="text-ink-3"> — {link.note}</span> : null}
									</li>
								))}
							</ul>
						</section>
					) : null}
					<div className="flex flex-wrap gap-3">
						<button
							type="button"
							className="rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-semibold text-ink-2 hover:border-accent hover:text-accent disabled:opacity-40"
							onClick={goLessonsPrev}
							disabled={lessonIndex === 0}
						>
							Previous
						</button>
						<button
							type="button"
							className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:brightness-105"
							onClick={goLessonsNext}
						>
							{lessonIndex >= totalLessons - 1 ? 'Start quiz' : 'Next'}
						</button>
					</div>
				</article>
			) : null}

			{phase === 'quiz' && quizItem ? (
				<article className="max-w-3xl rounded-xl border border-border bg-surface-2 p-6">
					<p className="m-0 mb-4 text-base font-semibold leading-snug text-ink-1">{quizItem.prompt}</p>
					<div className="flex flex-col gap-2" role="radiogroup" aria-labelledby={`quiz-q-${quizItem.id}`}>
						<span id={`quiz-q-${quizItem.id}`} className="sr-only">
							Select one answer
						</span>
						{quizItem.options.map((label, i) => (
							<button
								key={label}
								type="button"
								disabled={showQuizFeedback}
								onClick={() => pickOption(i)}
								className={`rounded-lg border-2 px-3 py-3 text-left text-sm text-ink-1 ${
									showQuizFeedback && i === quizItem.correctIndex
										? 'border-success bg-success-muted'
										: showQuizFeedback && picked === i && i !== quizItem.correctIndex
											? 'border-danger bg-red-50'
											: picked === i
												? 'border-accent bg-accent-muted'
												: 'border-border bg-surface-1 hover:border-accent'
								}`}
							>
								{label}
							</button>
						))}
					</div>
					{showQuizFeedback ? (
						<p className="mt-4 rounded-lg border-l-4 border-accent bg-surface-1 p-3 text-sm text-ink-2" role="status">
							{quizItem.explanation}
						</p>
					) : null}
					<div className="mt-4 flex flex-wrap gap-3">
						<button
							type="button"
							className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
							onClick={checkAnswer}
							disabled={picked == null || showQuizFeedback}
						>
							Check answer
						</button>
						<button
							type="button"
							className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-ink-2 disabled:opacity-40"
							onClick={nextQuiz}
							disabled={!showQuizFeedback}
						>
							{quizIndex >= totalQuiz - 1 ? 'See results' : 'Next question'}
						</button>
					</div>
				</article>
			) : null}

			{phase === 'results' ? (
				<article className="max-w-3xl rounded-xl border border-border bg-surface-2 p-6">
					<h3 className="m-0 text-lg font-bold text-ink-1">Quiz results</h3>
					<p className="mt-2 text-lg text-ink-1">
						You answered <strong>{correctCount}</strong> of <strong>{totalQuiz}</strong> correctly.
					</p>
					{correctCount === totalQuiz ? (
						<p className="text-ink-2">
							Solid grasp of the core definitions—next try <strong>Read the metrics</strong> for twelve short cases,
							then the <strong>Project scenarios</strong> path.
						</p>
					) : correctCount >= totalQuiz * 0.75 ? (
						<p className="text-ink-2">Good work. Skim the lesson cards for any questions you missed, then try again anytime.</p>
					) : (
						<p className="text-ink-2">
							Review the lesson cards and retry the quiz when ready—the terms pay off quickly with repetition.
						</p>
					)}
					<section className="my-6 rounded-lg border border-border bg-surface-1 p-4" aria-labelledby="evms101-res-quiz-title">
						<h4 id="evms101-res-quiz-title" className="m-0 text-xs font-bold uppercase tracking-wide text-ink-1">
							Further reading
						</h4>
						<ul className="mt-2 list-disc pl-5 text-sm text-ink-2">
							{evms101ExternalResources.map((link) => (
								<li key={link.href}>
									<a className="font-semibold text-accent hover:underline" href={link.href} target="_blank" rel="noopener noreferrer">
										{link.label}
									</a>
									{link.note ? <span className="text-ink-3"> — {link.note}</span> : null}
								</li>
							))}
						</ul>
					</section>
					<div className="flex flex-wrap gap-3">
						<button type="button" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold" onClick={restartFromTop}>
							Review lessons
						</button>
						<button type="button" className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white" onClick={handleBack}>
							Learning paths
						</button>
					</div>
				</article>
			) : null}
		</div>
	);
}
