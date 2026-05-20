/**
 * Thread progress (EVMS 101 quiz, metrics literacy) — debounced localStorage.
 */

import { readJson, writeJsonDebounced } from '../storage.js';

const STORAGE_KEY = 'evms-training-progress';

const DEFAULT_PROGRESS = {
	evms101: { lessonIndex: 0, quizComplete: false, quizScore: 0, quizTotal: 0 },
	metricsLiteracy: { scenarioIndex: 0, questionIndex: 0, completed: false },
	certificates: []
};

function loadProgress() {
	const saved = readJson(STORAGE_KEY, null);
	if (!saved || typeof saved !== 'object') return structuredClone(DEFAULT_PROGRESS);
	return {
		...structuredClone(DEFAULT_PROGRESS),
		...saved,
		evms101: { ...DEFAULT_PROGRESS.evms101, ...saved.evms101 },
		metricsLiteracy: { ...DEFAULT_PROGRESS.metricsLiteracy, ...saved.metricsLiteracy },
		certificates: Array.isArray(saved.certificates) ? saved.certificates : []
	};
}

export function createProgressStore() {
	let progress = $state(loadProgress());

	function persist() {
		writeJsonDebounced(STORAGE_KEY, progress);
	}

	function saveEvms101(patch) {
		progress = { ...progress, evms101: { ...progress.evms101, ...patch } };
		persist();
	}

	function saveMetricsLiteracy(patch) {
		progress = { ...progress, metricsLiteracy: { ...progress.metricsLiteracy, ...patch } };
		persist();
	}

	function recordCertificate(entry) {
		const certificates = [...progress.certificates, entry];
		progress = { ...progress, certificates };
		persist();
	}

	return {
		get progress() {
			return progress;
		},
		get evms101() {
			return progress.evms101;
		},
		get metricsLiteracy() {
			return progress.metricsLiteracy;
		},
		saveEvms101,
		saveMetricsLiteracy,
		recordCertificate
	};
}
