<script>
	let visible = $state(false);
	let message = $state('');

	function show(msg) {
		message = msg || 'Something went wrong while loading the interactive lesson.';
		visible = true;
	}

	function reload() {
		window.location.reload();
	}

	$effect(function registerGlobalHandlers() {
		function onError(event) {
			if (event instanceof ErrorEvent) {
				show(event.message);
			}
		}
		function onRejection(event) {
			const reason = event.reason;
			show(reason?.message || String(reason));
		}
		window.addEventListener('error', onError);
		window.addEventListener('unhandledrejection', onRejection);
		return function cleanup() {
			window.removeEventListener('error', onError);
			window.removeEventListener('unhandledrejection', onRejection);
		};
	});

	export function notifyError(msg) {
		show(msg);
	}
</script>

{#if visible}
	<div class="error-banner" role="alert" aria-live="assertive">
		<p>
			<strong>Interactive mode interrupted.</strong>
			{message}
			Reload to resume your scenario or quiz where the browser saved progress.
		</p>
		<div class="actions">
			<button type="button" class="reload-btn" onclick={reload}>Reload page</button>
			<button type="button" class="dismiss-btn" onclick={() => (visible = false)}>Dismiss</button>
		</div>
	</div>
{/if}

<style>
	.error-banner {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		padding: var(--space-4);
		background: #7f1d1d;
		color: #fff;
		box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.2);
	}

	.error-banner p {
		margin: 0 0 var(--space-3);
		max-width: var(--content-max);
		margin-left: auto;
		margin-right: auto;
		font-size: var(--text-sm);
		line-height: 1.5;
	}

	.actions {
		display: flex;
		gap: var(--space-3);
		max-width: var(--content-max);
		margin: 0 auto;
	}

	.reload-btn,
	.dismiss-btn {
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius);
		font-size: var(--text-sm);
		font-weight: 600;
		cursor: pointer;
		border: none;
	}

	.reload-btn {
		background: #fff;
		color: #7f1d1d;
	}

	.dismiss-btn {
		background: transparent;
		color: #fecaca;
		border: 1px solid #fecaca;
	}
</style>
