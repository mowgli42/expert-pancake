<script>
	import { REFERENCE_SECTIONS } from '../lib/evms/reference-data.js';

	let { open = false, onClose } = $props();
</script>

{#if open}
	<div
		class="ref-overlay"
		role="dialog"
		aria-label="EVMS reference"
		onclick={onClose}
		onkeydown={(e) => e.key === 'Escape' && onClose?.()}
		tabindex="-1"
	>
		<div
			class="ref-panel"
			role="document"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.key === 'Escape' && onClose?.()}
		>
			<div class="ref-header">
				<h2>EVMS Reference</h2>
				<button class="close-btn" onclick={onClose} aria-label="Close">×</button>
			</div>
			<div class="ref-content">
				<p class="ref-intro">
					EVMS revolves around a small set of core metrics built from three primitives: Planned Value (PV), Earned Value (EV), and Actual Cost (AC).
				</p>
				{#each REFERENCE_SECTIONS as section}
					<section class="ref-section">
						<h3>{section.title}</h3>
						<div class="ref-body">
							{#each section.content.split(/\n\n+/) as block}
								{@const html = block
									.trim()
									.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
									.replace(/\n/g, '<br>')}
								<p>{@html html}</p>
							{/each}
						</div>
					</section>
				{/each}
				<section class="ref-section">
					<h3>How to Use in Practice</h3>
					<ol class="ref-steps">
						<li>Compute PV, EV, AC from your schedule and cost system.</li>
						<li>Calculate CV and SV to see raw cost and schedule deltas.</li>
						<li>Calculate CPI and SPI to normalize and compare.</li>
						<li>Use CPI (and optionally SPI) to choose an EAC formula, then derive ETC and VAC.</li>
						<li>Check TCPI to see how aggressive remaining performance must be.</li>
					</ol>
				</section>
			</div>
		</div>
	</div>
{/if}

<style>
	.ref-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-4);
		z-index: 1000;
	}

	.ref-panel {
		background: var(--surface-1);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
		border: 1px solid var(--border);
		max-width: 560px;
		max-height: 90vh;
		overflow: hidden;
		animation: fadeIn 0.2s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.98);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.ref-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-4);
		border-bottom: 1px solid var(--border);
		background: var(--surface-2);
	}

	.ref-header h2 {
		margin: 0;
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--text-1);
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 1.75rem;
		line-height: 1;
		color: var(--text-2);
		cursor: pointer;
		padding: var(--space-1);
	}

	.close-btn:hover {
		color: var(--text-1);
	}

	.ref-content {
		padding: var(--space-4);
		overflow-y: auto;
		max-height: calc(90vh - 80px);
	}

	.ref-intro {
		color: var(--text-2);
		line-height: 1.6;
		margin: 0 0 var(--space-4);
		font-size: var(--text-sm);
	}

	.ref-section {
		margin-bottom: var(--space-4);
	}

	.ref-section h3 {
		margin: 0 0 var(--space-2);
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--accent);
	}

	.ref-body p {
		margin: 0 0 var(--space-2);
		font-size: var(--text-sm);
		color: var(--text-2);
		line-height: 1.6;
	}

	.ref-steps {
		margin: 0;
		padding-left: var(--space-5);
	}

	.ref-steps li {
		margin-bottom: var(--space-2);
	}
</style>
