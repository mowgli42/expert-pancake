'use client';

import dynamic from 'next/dynamic';

const InteractiveApp = dynamic(
	() => import('./InteractiveApp').then((m) => m.InteractiveApp),
	{
		ssr: false,
		loading: () => (
			<p className="mx-auto max-w-content px-4 py-10 text-center text-sm text-ink-2 sm:text-base">
				Loading interactive lessons…
			</p>
		)
	}
);

export function ClientTrainingShell() {
	return (
		<div id="evms-interactive-root" hidden className="min-h-screen">
			<InteractiveApp />
		</div>
	);
}
