/**
 * Game State Store - Tracks current scenario, turn, and EVMS metrics during play
 */

import { calculateEvmsMetrics } from '../evms/calculations.js';

const STORAGE_KEY = 'evms-training-game';

function loadGame() {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (_) {}
	return null;
}

function saveGame(state) {
	try {
		if (state && state.scenarioId) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		} else {
			localStorage.removeItem(STORAGE_KEY);
		}
	} catch (_) {}
}

export function createGameStore() {
	let scenarioId = $state(null);
	let turnIndex = $state(0);
	let pv = $state(0);
	let ev = $state(0);
	let ac = $state(0);
	let bac = $state(0);
	let feedback = $state(null);
	let choiceHistory = $state([]);

	function initScenario(scenario) {
		scenarioId = scenario.id;
		turnIndex = 0;
		pv = 0;
		ev = 0;
		ac = 0;
		bac = scenario.bac;
		feedback = null;
		choiceHistory = [];
		saveGame({ scenarioId, turnIndex, pv, ev, ac, bac, choiceHistory });
	}

	function applyChoice(choice) {
		pv += choice.pvDelta ?? 0;
		ev += choice.evDelta ?? 0;
		ac += choice.acDelta ?? 0;
		feedback = choice.feedback ?? null;
		choiceHistory = [...choiceHistory, { text: choice.text, turnIndex }];
		turnIndex += 1;
		saveGame({ scenarioId, turnIndex, pv, ev, ac, bac, choiceHistory });
	}

	function resetGame() {
		scenarioId = null;
		turnIndex = 0;
		pv = 0;
		ev = 0;
		ac = 0;
		bac = 0;
		feedback = null;
		choiceHistory = [];
		localStorage.removeItem(STORAGE_KEY);
	}

	function restoreGame(saved) {
		if (saved) {
			scenarioId = saved.scenarioId;
			turnIndex = saved.turnIndex ?? 0;
			pv = saved.pv ?? 0;
			ev = saved.ev ?? 0;
			ac = saved.ac ?? 0;
			bac = saved.bac ?? 0;
			choiceHistory = saved.choiceHistory ?? [];
		}
	}

	// Restore on init
	const saved = loadGame();
	if (saved) {
		restoreGame(saved);
	}

	const metrics = $derived(
		bac > 0
			? calculateEvmsMetrics({ pv, ev, ac, bac })
			: null
	);

	return {
		get scenarioId() {
			return scenarioId;
		},
		get turnIndex() {
			return turnIndex;
		},
		get pv() {
			return pv;
		},
		get ev() {
			return ev;
		},
		get ac() {
			return ac;
		},
		get bac() {
			return bac;
		},
		get feedback() {
			return feedback;
		},
		get choiceHistory() {
			return choiceHistory;
		},
		get metrics() {
			return metrics;
		},
		get isComplete() {
			return scenarioId !== null && turnIndex > 0;
		},
		initScenario,
		applyChoice,
		resetGame,
		loadGame
	};
}
