'use client';

import { useEffect, useState } from 'react';
import { useBeadsStore } from '@/hooks/useBeadsStore';
import { useGameStore } from '@/hooks/useGameStore';
import { scenarios } from '@/lib/scenarios/index';
import { THREAD_IDS } from '@/lib/threads/index';
import { BeadsProgress } from './BeadsProgress';
import { Evms101Thread } from './Evms101Thread';
import { MetricsLiteracyThread } from './MetricsLiteracyThread';
import { ScenarioCard } from './ScenarioCard';
import { ScenarioPlay } from './ScenarioPlay';
import { ThreadPicker } from './ThreadPicker';

function RevealInteractiveShell() {
	useEffect(() => {
		document.getElementById('evms-static-fallback')?.setAttribute('hidden', '');
		document.getElementById('evms-interactive-root')?.removeAttribute('hidden');
	}, []);
	return null;
}

export function InteractiveApp() {
	const game = useGameStore();
	const beads = useBeadsStore();
	const [currentScenarioId, setCurrentScenarioId] = useState<number | null>(null);
	const [activeThread, setActiveThread] = useState<string | null>(null);

	useEffect(() => {
		if (activeThread !== THREAD_IDS.projects) return;
		const sid = game.scenarioId;
		if (sid == null || currentScenarioId != null) return;
		const scenario = scenarios.find((s) => s.id === sid);
		if (!scenario || game.turnIndex >= scenario.turns.length) return;
		setCurrentScenarioId(sid);
	}, [activeThread, game.scenarioId, game.turnIndex, currentScenarioId]);

	function handleSelectThread(threadId: string) {
		setActiveThread(threadId);
	}

	function handleLeaveThread() {
		setActiveThread(null);
	}

	function handleSelectScenario(scenario: (typeof scenarios)[number]) {
		game.initScenario(scenario);
		setCurrentScenarioId(scenario.id);
	}

	function handleBackFromScenario() {
		setCurrentScenarioId(null);
	}

	function handleResetProgress() {
		beads.resetProgress();
		game.resetGame();
	}

	return (
		<>
			<RevealInteractiveShell />
			<div className="flex min-h-screen flex-col">
			<header className="bg-gradient-to-br from-accent to-accent-dark px-4 py-6 text-white shadow-md sm:px-6 sm:py-8">
				<div className="mx-auto max-w-content">
					<h1 className="m-0 text-2xl font-extrabold tracking-tight sm:text-3xl">EVMS Training</h1>
					<p className="mt-2 text-base text-white/95 sm:text-lg">Earned Value Management — Learn by doing</p>
					{activeThread === THREAD_IDS.projects ? (
						<div className="mt-4">
							<BeadsProgress beads={beads.beads} completedCount={beads.completedCount} totalCount={beads.totalCount} />
						</div>
					) : null}
				</div>
			</header>

			<div className="mx-auto w-full max-w-content flex-1 px-4 py-6 sm:px-6">
				{activeThread === THREAD_IDS.evms101 ? (
					<Evms101Thread onBack={handleLeaveThread} />
				) : activeThread === THREAD_IDS.metricsLiteracy ? (
					<MetricsLiteracyThread onBack={handleLeaveThread} />
				) : activeThread === THREAD_IDS.projects ? (
					currentScenarioId ? (
						<ScenarioPlay scenarioId={currentScenarioId} game={game} beads={beads} onBack={handleBackFromScenario} />
					) : (
						<>
							<button
								type="button"
								onClick={handleLeaveThread}
								className="mb-4 text-sm font-semibold text-accent underline decoration-2 underline-offset-2 hover:text-accent-dark"
							>
								← Learning paths
							</button>
							<section aria-labelledby="scenarios-heading">
								<div className="mb-6">
									<h2 id="scenarios-heading" className="m-0 mb-2 text-2xl font-bold text-ink-1">
										Project scenarios
									</h2>
									<p className="m-0 max-w-prose text-base leading-relaxed text-ink-2">
										Progress through 10 real-world projects—from a backyard fence to a lunar mission. Each scenario
										presents decisions that affect your EVMS metrics.
									</p>
								</div>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
									{scenarios.map((scenario) => (
										<ScenarioCard
											key={scenario.id}
											scenario={scenario}
											unlocked={beads.isUnlocked(scenario.id)}
											completed={beads.isCompleted(scenario.id)}
											onSelect={() => handleSelectScenario(scenario)}
										/>
									))}
								</div>
								{beads.completedCount > 0 ? (
									<button
										type="button"
										onClick={handleResetProgress}
										className="mt-6 border border-border bg-transparent px-4 py-2 text-sm text-ink-2 transition hover:border-danger hover:text-danger"
									>
										Reset Progress
									</button>
								) : null}
							</section>
						</>
					)
				) : (
					<ThreadPicker onSelectThread={handleSelectThread} />
				)}
			</div>

			<footer className="border-t border-border px-4 py-4 text-center text-sm text-ink-3">
				<p className="m-0">Built with Next.js · Design: IxDF principles · Progress: Beads</p>
			</footer>
		</div>
		</>
	);
}
