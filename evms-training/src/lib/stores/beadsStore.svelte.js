/**
 * Beads progress store—tracks completion across 10 scenarios.
 * Persisted to localStorage (debounced).
 */

import { readJson, writeJsonDebounced, writeJson } from '../storage.js';

const STORAGE_KEY = 'evms-training-beads';

const DEFAULT_BEADS = [
	{ id: 1, name: 'Building a Fence', difficulty: 1, unlocked: true, completed: false, scenarioId: 1 },
	{ id: 2, name: 'Kitchen Renovation', difficulty: 2, unlocked: false, completed: false, scenarioId: 2 },
	{ id: 3, name: 'Software Feature Sprint', difficulty: 3, unlocked: false, completed: false, scenarioId: 3 },
	{ id: 4, name: 'Marketing Campaign Launch', difficulty: 4, unlocked: false, completed: false, scenarioId: 4 },
	{ id: 5, name: 'Office Relocation', difficulty: 5, unlocked: false, completed: false, scenarioId: 5 },
	{ id: 6, name: 'Manufacturing Line Setup', difficulty: 6, unlocked: false, completed: false, scenarioId: 6 },
	{ id: 7, name: 'Hospital Wing Expansion', difficulty: 7, unlocked: false, completed: false, scenarioId: 7 },
	{ id: 8, name: 'Bridge Rehabilitation', difficulty: 8, unlocked: false, completed: false, scenarioId: 8 },
	{ id: 9, name: 'New Product Launch', difficulty: 9, unlocked: false, completed: false, scenarioId: 9 },
	{ id: 10, name: 'Lunar Mission Program', difficulty: 10, unlocked: false, completed: false, scenarioId: 10 }
];

function loadFromStorage() {
	const parsed = readJson(STORAGE_KEY, null);
	if (!parsed) return structuredClone(DEFAULT_BEADS);
	return Array.isArray(parsed) ? parsed : structuredClone(DEFAULT_BEADS);
}

function saveToStorage(beads) {
	writeJsonDebounced(STORAGE_KEY, beads);
}

export function createBeadsStore() {
	let beads = $state(loadFromStorage());

	function unlockNext() {
		const next = beads.find((b) => !b.completed && !b.unlocked);
		if (!next) return false;
		beads = beads.map((b) => (b.id === next.id ? { ...b, unlocked: true } : b));
		saveToStorage(beads);
		return true;
	}

	function completeBead(scenarioId) {
		beads = beads.map((b) => (b.scenarioId === scenarioId ? { ...b, completed: true } : b));
		unlockNext();
		saveToStorage(beads);
	}

	function resetProgress() {
		beads = structuredClone(DEFAULT_BEADS);
		writeJson(STORAGE_KEY, beads);
	}

	function isUnlocked(scenarioId) {
		return beads.find((b) => b.scenarioId === scenarioId)?.unlocked ?? false;
	}

	function isCompleted(scenarioId) {
		return beads.find((b) => b.scenarioId === scenarioId)?.completed ?? false;
	}

	return {
		get beads() {
			return beads;
		},
		get completedCount() {
			return beads.filter((b) => b.completed).length;
		},
		get totalCount() {
			return beads.length;
		},
		unlockNext,
		completeBead,
		resetProgress,
		isUnlocked,
		isCompleted
	};
}
