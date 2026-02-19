<script>
	import { EVMS_TERMS } from '../lib/evms/reference-data.js';

	let { open = false, onClose, metricKeys = ['PV', 'EV', 'AC', 'BAC', 'SV', 'CV', 'SPI', 'CPI'] } = $props();

	const terms = $derived(metricKeys.map((k) => EVMS_TERMS[k]).filter(Boolean));
</script>

{#if open}
	<div
		class="toaster-overlay"
		role="dialog"
		aria-label="EVMS terms help"
		onclick={onClose}
		onkeydown={(e) => e.key === 'Escape' && onClose?.()}
		tabindex="-1"
	>
		<div
			class="toaster"
			role="document"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.key === 'Escape' && onClose?.()}
		>
			<div class="toaster-header">
				<h4>EVMS Terms</h4>
				<button class="close-btn" onclick={onClose} aria-label="Close">×</button>
			</div>
			<div class="toaster-content">
				{#each terms as term}
					<div class="term">
						<span class="term-acronym">{term.acronym}</span>
						<span class="term-name">{term.name}</span>
						<p class="term-def">{term.definition}</p>
						<p class="term-interp">{term.interpretation}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.toaster-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
		padding: var(--space-4);
		z-index: 1000;
	}

	.toaster {
		background: var(--surface-1);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
		border: 1px solid var(--border);
		max-width: 360px;
		max-height: 80vh;
		overflow: hidden;
		animation: slideIn 0.2s ease-out;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(1rem);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.toaster-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-3);
		border-bottom: 1px solid var(--border);
		background: var(--surface-2);
	}

	.toaster-header h4 {
		margin: 0;
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--text-1);
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 1.5rem;
		line-height: 1;
		color: var(--text-2);
		cursor: pointer;
		padding: var(--space-1);
	}

	.close-btn:hover {
		color: var(--text-1);
	}

	.toaster-content {
		padding: var(--space-3);
		overflow-y: auto;
		max-height: 60vh;
	}

	.term {
		padding: var(--space-2) 0;
		border-bottom: 1px solid var(--border);
	}

	.term:last-child {
		border-bottom: none;
	}

	.term-acronym {
		font-weight: 700;
		color: var(--accent);
		font-size: var(--text-sm);
		margin-right: var(--space-1);
	}

	.term-name {
		font-weight: 600;
		color: var(--text-1);
		font-size: var(--text-sm);
	}

	.term-def {
		margin: var(--space-1) 0 0;
		font-size: var(--text-xs);
		color: var(--text-2);
		line-height: 1.5;
	}

	.term-interp {
		margin: var(--space-1) 0 0;
		font-size: var(--text-xs);
		color: var(--accent);
		font-weight: 500;
	}
</style>
