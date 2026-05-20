/**
 * Event tracking — GA4 (gtag) when configured, plus console/debug fallback.
 * Set VITE_GA4_MEASUREMENT_ID at build time to enable production analytics.
 */

const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim() || '';
let gtagReady = false;

function ensureGtag() {
	if (!GA4_ID || typeof window === 'undefined' || gtagReady) return;
	if (typeof window.gtag === 'function') {
		gtagReady = true;
		return;
	}
	const script = document.createElement('script');
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
	document.head.appendChild(script);
	window.dataLayer = window.dataLayer || [];
	window.gtag = function gtag() {
		window.dataLayer.push(arguments);
	};
	window.gtag('js', new Date());
	window.gtag('config', GA4_ID, { send_page_view: false });
	gtagReady = true;
}

/**
 * @param {string} eventName
 * @param {Record<string, string | number | boolean | undefined>} [params]
 */
export function trackEvent(eventName, params = {}) {
	if (typeof window === 'undefined') return;
	const payload = { ...params, event: eventName };
	if (import.meta.env.DEV) {
		console.debug('[analytics]', eventName, payload);
	}
	ensureGtag();
	if (GA4_ID && typeof window.gtag === 'function') {
		window.gtag('event', eventName, params);
	}
	window.dispatchEvent(new CustomEvent('evms-analytics', { detail: payload }));
}

export function trackPathSelected(threadId) {
	trackEvent('path_selected', { path_id: threadId });
}

export function trackQuizCompleted(threadId, score, total) {
	trackEvent('quiz_completed', {
		path_id: threadId,
		score,
		total,
		percent: total > 0 ? Math.round((score / total) * 100) : 0
	});
}

export function trackScenarioProgress(scenarioId, turnIndex, totalTurns, action) {
	trackEvent('scenario_progress', {
		scenario_id: scenarioId,
		turn_index: turnIndex,
		total_turns: totalTurns,
		action
	});
}

export function trackScenarioChoice(scenarioId, turnIndex, choiceText) {
	trackEvent('scenario_choice', {
		scenario_id: scenarioId,
		turn_index: turnIndex,
		choice_label: choiceText.slice(0, 120)
	});
}

export function trackScenarioCompleted(scenarioId) {
	trackEvent('scenario_completed', { scenario_id: scenarioId });
}

export function trackCertificateDownload(pathId) {
	trackEvent('certificate_download', { path_id: pathId });
}
