/**
 * Beads Progress Store - Tracks completion across 10 EVMS scenarios
 * Persisted to localStorage for continuity
 * Using .svelte.js for Svelte 5 runes support
 */

const STORAGE_KEY = 'evms-training-beads';

const defaultBeads = [
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
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (_) {}
	return defaultBeads;
}

function saveToStorage(beads) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(beads));
	} catch (_) {}
}

export function createBeadsStore() {
	let beads = $state(loadFromStorage());

	function unlockNext() {
		const next = beads.find((b) => !b.completed && !b.unlocked);
		if (next) {
			beads = beads.map((b) =>
				b.id === next.id ? { ...b, unlocked: true } : b
			);
			saveToStorage(beads);
			return true;
		}
		return false;
	}

	function completeBead(scenarioId) {
		beads = beads.map((b) =>
			b.scenarioId === scenarioId ? { ...b, completed: true } : b
		);
		unlockNext();
		saveToStorage(beads);
	}

	function resetProgress() {
		beads = structuredClone(defaultBeads);
		saveToStorage(beads);
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
		isUnlocked: (scenarioId) => beads.find((b) => b.scenarioId === scenarioId)?.unlocked ?? false,
		isCompleted: (scenarioId) => beads.find((b) => b.scenarioId === scenarioId)?.completed ?? false
	};
}
