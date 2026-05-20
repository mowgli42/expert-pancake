import { StaticCurriculum } from '@/components/StaticCurriculum';
import { ClientTrainingShell } from '@/components/interactive/ClientTrainingShell';

export default function HomePage() {
	return (
		<>
			<noscript>
				<div
					role="status"
					className="border-b border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900"
				>
					<strong>Interactive mode</strong> needs JavaScript. The full curriculum outline is below—scroll to{' '}
					<a href="#main-content" className="font-semibold text-accent underline">
						main content
					</a>
					.
				</div>
			</noscript>
			<main id="main-content">
				<div id="evms-static-fallback">
					<StaticCurriculum />
				</div>
				<ClientTrainingShell />
			</main>
		</>
	);
}
