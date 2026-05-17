'use client';

export function ScenarioCard({
	scenario,
	unlocked,
	completed,
	onSelect
}: {
	scenario: {
		id: number;
		title: string;
		subtitle: string;
		bac: number;
		duration: string;
		difficulty: number;
	};
	unlocked: boolean;
	completed: boolean;
	onSelect: () => void;
}) {
	return (
		<button
			type="button"
			disabled={!unlocked}
			aria-disabled={!unlocked}
			aria-label={`Scenario: ${scenario.title} - ${scenario.subtitle}`}
			onClick={() => unlocked && onSelect()}
			className={`relative w-full rounded-xl border-2 p-4 text-left transition ${
				unlocked ? 'cursor-pointer hover:-translate-y-0.5 hover:border-accent hover:shadow-card' : 'cursor-not-allowed opacity-60'
			} ${completed ? 'border-success bg-success-muted' : 'border-border bg-surface-2'} ${!unlocked ? 'grayscale-[0.3]' : ''}`}
		>
			<div className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">Level {scenario.difficulty}</div>
			<h4 className="m-0 mb-1 text-lg font-bold text-ink-1">{scenario.title}</h4>
			<p className="m-0 mb-2 text-sm leading-snug text-ink-2">{scenario.subtitle}</p>
			<div className="flex flex-wrap gap-2 text-xs text-ink-3">
				<span>BAC: ${scenario.bac.toLocaleString()}</span>
				<span>•</span>
				<span>{scenario.duration}</span>
			</div>
			{completed ? (
				<span className="absolute right-3 top-3 rounded bg-success px-2 py-1 text-xs font-semibold text-white">
					Complete
				</span>
			) : !unlocked ? (
				<span className="absolute right-3 top-3 rounded bg-surface-3 px-2 py-1 text-xs font-semibold text-ink-3">
					Locked
				</span>
			) : null}
		</button>
	);
}
