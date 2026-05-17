'use client';

import { learningThreads } from '@/lib/threads/index';

export function ThreadPicker({ onSelectThread }: { onSelectThread: (id: string) => void }) {
	return (
		<section className="mb-8" aria-labelledby="threads-heading">
			<div className="mb-6">
				<h2 id="threads-heading" className="text-2xl font-bold text-ink-1">
					Choose a learning path
				</h2>
				<p className="mt-2 max-w-prose text-base leading-relaxed text-ink-2">
					Recommended order on this page: EVMS 101 first, then Read the metrics (twelve cases), then Project
					scenarios for hands-on narratives.
				</p>
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{learningThreads.map((thread) => (
					<button
						key={thread.id}
						type="button"
						onClick={() => onSelectThread(thread.id)}
						aria-label={`Learning path: ${thread.title} — ${thread.subtitle}`}
						className={`flex min-h-[12.5rem] flex-col gap-2 rounded-xl border-2 border-border bg-surface-2 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-accent hover:shadow-card ${
							thread.variant === 'projects'
								? 'border-l-4 border-l-accent'
								: thread.variant === 'academic'
									? 'border-l-4 border-l-indigo-500'
									: 'border-l-4 border-l-teal-600'
						}`}
					>
						<span className="text-xs font-semibold uppercase tracking-wide text-ink-3">{thread.subtitle}</span>
						<h3 className="m-0 text-xl font-bold text-ink-1">{thread.title}</h3>
						<p className="m-0 flex-1 text-sm leading-relaxed text-ink-2">{thread.description}</p>
						<span className="mt-2 text-sm font-semibold text-accent">Open</span>
					</button>
				))}
			</div>
		</section>
	);
}
