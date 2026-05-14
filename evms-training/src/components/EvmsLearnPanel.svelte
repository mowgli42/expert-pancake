<section class="learn-panel" aria-labelledby="evms-101-heading">
	<h3 id="evms-101-heading">EVMS 101</h3>
	<p class="learn-lede">
		<strong>Earned value</strong> compares three ideas at once: how much work was <em>planned</em> to be done,
		how much was <em>actually accomplished</em> (in budget terms), and what it <em>really cost</em>.
		Each scenario piles up your choices into PV, EV, and AC so you can read schedule and cost health from the
		numbers.
	</p>
	<ul class="learn-list">
		<li><strong>PV</strong> (Planned Value) — budgeted value of work scheduled to date.</li>
		<li><strong>EV</strong> (Earned Value) — budgeted value of work actually performed to date.</li>
		<li><strong>AC</strong> (Actual Cost) — what you actually spent for that work.</li>
		<li><strong>BAC</strong> — total budget at completion for the scenario.</li>
	</ul>
	<p class="learn-tight">
		<strong>SPI</strong> is EV ÷ PV (schedule index; 1.0 means on the plan’s pace of earned value).
		<strong>CPI</strong> is EV ÷ AC (cost index; above 1.0 means you are getting more earned value per dollar
		spent than a 1.0 baseline).
	</p>
	<p class="learn-tight">
		<strong>SV</strong> = EV − PV and <strong>CV</strong> = EV − AC are variances in <strong>budget
		dollars</strong> (classic ANSI-748-style EVM), not calendar days by themselves—hover the metric labels for
		reminders while you play.
	</p>

	<details class="learn-advanced">
		<summary>Advanced topics</summary>
		<div class="advanced-body">
			<p>
				<strong>EAC</strong> (estimate at completion) and <strong>VAC</strong> (variance at completion) use
				your cumulative CPI to project total cost at the end and compare it to BAC. <strong>ETC</strong> is the
				remaining forecast from today to completion.
			</p>
			<p>
				<strong>Earned Schedule</strong> extends EVM when planned value is spread across a real calendar
				baseline: you can express schedule variance in <em>time units</em> and tie forecasts to dates. This
				trainer keeps math simple—linear PV steps per turn—so use SPI for schedule tone and treat any
				“days of planned pace” notes on the complete screen as teaching analogs, not a full earned-schedule
				engine.
			</p>
			<p>
				For the full product vision and scenario catalog, see the OpenSpec at
				<code class="inline-code">.openspec/evms-training-website.md</code> in the repository (developer
				documentation, not shipped in the static build).
			</p>
		</div>
	</details>
</section>

<style>
	.learn-panel {
		margin-bottom: var(--space-6);
		padding: var(--space-5);
		background: var(--surface-2);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		max-width: 72ch;
	}

	.learn-panel h3 {
		margin: 0 0 var(--space-3);
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--text-1);
	}

	.learn-lede {
		margin: 0 0 var(--space-3);
		font-size: var(--text-base);
		line-height: 1.6;
		color: var(--text-2);
	}

	.learn-list {
		margin: 0 0 var(--space-4);
		padding-left: 1.25rem;
		color: var(--text-2);
		font-size: var(--text-sm);
		line-height: 1.55;
	}

	.learn-list li {
		margin-bottom: var(--space-2);
	}

	.learn-list li:last-child {
		margin-bottom: 0;
	}

	.learn-tight {
		margin: 0 0 var(--space-3);
		font-size: var(--text-sm);
		line-height: 1.55;
		color: var(--text-2);
	}

	.learn-tight:last-of-type {
		margin-bottom: var(--space-4);
	}

	.learn-advanced {
		margin-top: var(--space-2);
		border-top: 1px solid var(--border);
		padding-top: var(--space-3);
	}

	.learn-advanced summary {
		cursor: pointer;
		font-weight: 600;
		font-size: var(--text-sm);
		color: var(--accent);
		list-style-position: outside;
	}

	.learn-advanced summary:hover {
		color: var(--accent-hover);
	}

	.advanced-body {
		margin-top: var(--space-3);
		padding-top: var(--space-1);
	}

	.advanced-body p {
		margin: 0 0 var(--space-3);
		font-size: var(--text-sm);
		line-height: 1.55;
		color: var(--text-2);
	}

	.advanced-body p:last-child {
		margin-bottom: 0;
	}

	.inline-code {
		font-size: 0.9em;
		padding: 0.1em 0.35em;
		border-radius: var(--radius);
		background: var(--surface-1);
		border: 1px solid var(--border);
		font-family: ui-monospace, monospace;
		color: var(--text-1);
	}
</style>
