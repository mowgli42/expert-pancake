export function StaticCurriculum() {
	return (
		<div className="bg-slate-50 text-slate-900">
			<div className="bg-gradient-to-br from-accent to-accent-dark px-4 py-8 text-white shadow-md sm:px-6 sm:py-10">
				<div className="mx-auto max-w-content">
					<h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">EVMS Training</h1>
					<p className="mt-2 max-w-2xl text-base opacity-95 sm:text-lg">
						Earned value management and EVMS—interactive lessons, metrics drills, and ten project scenarios.
					</p>
				</div>
			</div>

			<div className="mx-auto max-w-content px-4 py-8 sm:px-6 sm:py-10">
				<div>
					<p className="max-w-prose text-base leading-relaxed text-slate-700">
						This page is an <strong>interactive training experience</strong> used by program controls, finance,
						and engineering teams to practice <strong>earned value management (EVM)</strong> and{' '}
						<strong>EVMS-style</strong> reporting (PV, EV, AC, BAC, variances, SPI/CPI, and simple EAC/VAC
						forecasts). When JavaScript loads successfully, you can choose learning paths, take a short quiz,
						and drive live metrics through narrative scenarios.
					</p>

					<div
						className="my-6 rounded-lg border-l-4 border-accent bg-emerald-50 p-4 text-sm text-emerald-950"
						role="note"
					>
						<strong>No JavaScript?</strong> You can still read everything on this screen for procurement reviews,
						accessibility, or locked-down browsers. If scripts are only blocked temporarily, refresh once your
						connection allows the application bundle to load—the same headings and flows appear in interactive
						mode.
					</div>

					<h2 className="mt-10 text-xl font-bold text-teal-950 sm:text-2xl">Learning paths (recommended order)</h2>

					<section
						className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
						aria-labelledby="path-evms101"
					>
						<h3 id="path-evms101" className="text-lg font-bold text-teal-900">
							1. EVMS 101 — terms, comparison, and quiz
						</h3>
						<p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
							Introduces <strong>BAC, PV, EV, AC</strong>, schedule and cost variances (<strong>SV, CV</strong>),
							indices (<strong>SPI, CPI</strong>), and forecast concepts (<strong>EAC, ETC, VAC</strong>).
							Includes a contrast between <strong>spend-only tracking</strong> and true earned value, a small
							numeric example, and a short multiple-choice quiz. Links to PMI, NDIA, and NASA references are
							included for deeper reading.
						</p>
					</section>

					<section
						className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
						aria-labelledby="path-metrics"
					>
						<h3 id="path-metrics" className="text-lg font-bold text-teal-900">
							2. Read the metrics — twelve scenario drills
						</h3>
						<p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
							Twelve fixed snapshots with realistic program narratives. Each case shows PV, EV, AC, and BAC so
							you can interpret <strong>SPI, CPI</strong>, and variances. Several items include a{' '}
							<strong>program manager quote</strong> that may conflict with the numbers—you choose the response
							that best aligns with the metrics (common in audits and IPT reviews).
						</p>
					</section>

					<section
						className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
						aria-labelledby="path-projects"
					>
						<h3 id="path-projects" className="text-lg font-bold text-teal-900">
							3. Project scenarios — ten choose-your-path projects
						</h3>
						<p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
							Hands-on stories from a <strong>backyard fence</strong> through a{' '}
							<strong>lunar mission program</strong>. Decisions change{' '}
							<strong>planned value, earned value, and actual cost</strong>; the dashboard updates SPI/CPI and
							related metrics. Progress is saved in the browser (local storage) so you can resume.
						</p>
						<p className="mt-3 text-sm font-semibold text-slate-800">Sample scenario titles:</p>
						<ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 sm:text-base">
							<li>Building a Fence, Kitchen Renovation, Software Feature Sprint</li>
							<li>Marketing Campaign Launch, Office Relocation, Manufacturing Line Setup</li>
							<li>Hospital Wing Expansion, Bridge Rehabilitation, New Product Launch, Lunar Mission Program</li>
						</ul>
					</section>

					<h2 className="mt-10 text-xl font-bold text-teal-950 sm:text-2xl">Metrics you will practice</h2>
					<p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-700 sm:text-base">
						PV, EV, AC, BAC, EAC, ETC, SV, CV, SPI, CPI, and VAC—aligned with common <strong>ANSI-748</strong> /{' '}
						<strong>PMI earned value</strong> teaching language. Narratives emphasize that{' '}
						<strong>schedule variance is in budget units</strong> (valued work), not calendar days by itself.
					</p>

					<h2 className="mt-10 text-xl font-bold text-teal-950 sm:text-2xl">Authoritative references (external)</h2>
					<ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
						<li>
							<a
								className="font-semibold text-accent underline-offset-2 hover:underline"
								href="https://www.pmi.org/pmbok-guide-standards/practice/earned-value-management"
								target="_blank"
								rel="noopener noreferrer"
							>
								PMI — Practice Standard for Earned Value Management
							</a>
						</li>
						<li>
							<a
								className="font-semibold text-accent underline-offset-2 hover:underline"
								href="https://www.ndia.org/divisions/industrial-committees/earned-value-management-systems"
								target="_blank"
								rel="noopener noreferrer"
							>
								NDIA — Earned Value Management Systems (EIA-748 intent materials)
							</a>
						</li>
						<li>
							<a
								className="font-semibold text-accent underline-offset-2 hover:underline"
								href="https://evm.nasa.gov/main"
								target="_blank"
								rel="noopener noreferrer"
							>
								NASA — EVM portal and handbooks
							</a>
						</li>
					</ul>

					<h2 className="mt-10 text-xl font-bold text-teal-950 sm:text-2xl">Audience</h2>
					<p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-700 sm:text-base">
						Program managers, control account managers, financial analysts, engineers, and auditors who need a{' '}
						<strong>low-risk practice environment</strong> before touching production systems or customer
						deliverables.
					</p>
				</div>

				<footer className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 sm:text-sm">
					Static curriculum outline for crawlers, accessibility, and no-JS environments. Interactive application
					loads with JavaScript.
				</footer>
			</div>
		</div>
	);
}
