<script>
	import { downloadCertificatePdf } from '../lib/certificate.js';
	import { trackCertificateDownload } from '../lib/analytics.js';

	let {
		pathId,
		pathTitle,
		hoursEstimate,
		onDownloaded
	} = $props();

	let learnerName = $state('');
	let error = $state('');

	function handleDownload() {
		const trimmed = learnerName.trim();
		if (!trimmed) {
			error = 'Enter your name for the certificate.';
			return;
		}
		error = '';
		const completedOn = new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
		downloadCertificatePdf({
			learnerName: trimmed,
			pathTitle,
			completedOn,
			hoursEstimate
		});
		trackCertificateDownload(pathId);
		onDownloaded?.({ learnerName: trimmed, completedOn });
	}
</script>

<section class="certificate-panel" aria-labelledby="cert-title">
	<h4 id="cert-title">Completion certificate</h4>
	<p class="cert-note">
		Download a PDF with your name and completion date for contact-hour or PDU records. Your certifying body
		(PMI, etc.) determines eligibility—this tool supplements formal training.
	</p>
	<label class="name-label" for="learner-name">Your name</label>
	<input
		id="learner-name"
		type="text"
		class="name-input"
		bind:value={learnerName}
		placeholder="Jane Smith"
		autocomplete="name"
		aria-describedby="cert-disclaimer"
	/>
	{#if error}
		<p class="cert-error" role="alert">{error}</p>
	{/if}
	<button type="button" class="download-btn" onclick={handleDownload}>
		Download certificate (PDF)
	</button>
	<p id="cert-disclaimer" class="disclaimer">
		Aligned with EIA-748 (ANSI-748) intent and PMI Practice Standard teaching language. Not a substitute for
		formal EVMS certification or audit.
	</p>
</section>

<style>
	.certificate-panel {
		margin-top: var(--space-5);
		padding: var(--space-4);
		background: var(--surface-1);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
	}

	.certificate-panel h4 {
		margin: 0 0 var(--space-2);
		font-size: var(--text-base);
		color: var(--text-1);
	}

	.cert-note {
		margin: 0 0 var(--space-3);
		font-size: var(--text-sm);
		color: var(--text-2);
		line-height: 1.55;
	}

	.name-label {
		display: block;
		font-size: var(--text-sm);
		font-weight: 600;
		margin-bottom: var(--space-1);
		color: var(--text-1);
	}

	.name-input {
		width: 100%;
		max-width: 320px;
		padding: var(--space-2) var(--space-3);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		font-size: var(--text-base);
		margin-bottom: var(--space-3);
	}

	.cert-error {
		margin: 0 0 var(--space-2);
		font-size: var(--text-sm);
		color: var(--danger);
	}

	.download-btn {
		padding: var(--space-2) var(--space-4);
		background: var(--accent);
		color: white;
		border: none;
		border-radius: var(--radius);
		font-size: var(--text-sm);
		font-weight: 600;
		cursor: pointer;
	}

	.download-btn:hover {
		filter: brightness(1.05);
	}

	.disclaimer {
		margin: var(--space-3) 0 0;
		font-size: var(--text-xs);
		color: var(--text-3);
		line-height: 1.5;
	}
</style>
