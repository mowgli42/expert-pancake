/**
 * Game state store—current scenario, turn, EVMS metrics.
 */

import { calculateEvmsMetrics } from '../evms/calculations.js';

const STORAGE_KEY = 'evms-training-game';

function loadFromStorage() {
	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) return null;
	let parsed;
	try {
		parsed = JSON.parse(raw);
	} catch {
		return null;
	}
	return parsed && typeof parsed.scenarioId === 'number' ? parsed : null;
}

function saveToStorage(state) {
	if (state?.scenarioId != null) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} else {
		localStorage.removeItem(STORAGE_KEY);
	}
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

	const saved = loadFromStorage();
	if (saved) {
		scenarioId = saved.scenarioId;
		turnIndex = saved.turnIndex ?? 0;
		pv = saved.pv ?? 0;
		ev = saved.ev ?? 0;
		ac = saved.ac ?? 0;
		bac = saved.bac ?? 0;
		choiceHistory = saved.choiceHistory ?? [];
	}

	function initScenario(scenario) {
		scenarioId = scenario.id;
		turnIndex = 0;
		pv = 0;
		ev = 0;
		ac = 0;
		bac = scenario.bac;
		feedback = null;
		choiceHistory = [];
		saveToStorage({ scenarioId, turnIndex, pv, ev, ac, bac, choiceHistory });
	}

	function applyChoice(choice) {
		pv += choice.pvDelta ?? 0;
		ev += choice.evDelta ?? 0;
		ac += choice.acDelta ?? 0;
		feedback = choice.feedback ?? null;
		choiceHistory = [...choiceHistory, { text: choice.text, turnIndex }];
		turnIndex += 1;
		saveToStorage({ scenarioId, turnIndex, pv, ev, ac, bac, choiceHistory });
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

	const metrics = $derived(bac > 0 ? calculateEvmsMetrics({ pv, ev, ac, bac }) : null);

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
			return scenarioId != null && turnIndex > 0;
		},
		initScenario,
		applyChoice,
		resetGame,
		loadGame: loadFromStorage
	};
}
