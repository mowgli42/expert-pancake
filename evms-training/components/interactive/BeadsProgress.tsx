'use client';

import type { Bead } from '@/hooks/useBeadsStore';

export function BeadsProgress({
	beads,
	completedCount,
	totalCount
}: {
	beads: Bead[];
	completedCount: number;
	totalCount: number;
}) {
	return (
		<div className="beads-container rounded-xl border border-border bg-surface-2 p-3">
			<div className="mb-2 flex items-center justify-between">
				<span className="text-sm font-semibold text-ink-2">Progress</span>
				<span className="text-xs tabular-nums text-ink-3">
					{completedCount}/{totalCount} scenarios
				</span>
			</div>
			<div className="flex items-center gap-0 overflow-x-auto py-1">
				{beads.map((bead, i) => (
					<div key={bead.id} className="flex items-center">
						<div
							className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold ${
								bead.completed
									? 'border-success bg-success-muted text-success'
									: bead.unlocked
										? 'border-accent bg-accent-muted text-accent'
										: 'border-border bg-surface-3 text-ink-3'
							} ${i === completedCount && bead.unlocked ? 'ring-2 ring-accent-muted' : ''}`}
							title={`${bead.name} (Difficulty ${bead.difficulty})`}
						>
							{bead.completed ? (
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
									<polyline points="20 6 9 17 4 12" />
								</svg>
							) : (
								i + 1
							)}
						</div>
						{i < beads.length - 1 ? (
							<div className={`h-0.5 w-3 shrink-0 ${bead.completed ? 'bg-success' : 'bg-border'}`} />
						) : null}
					</div>
				))}
			</div>
		</div>
	);
}
