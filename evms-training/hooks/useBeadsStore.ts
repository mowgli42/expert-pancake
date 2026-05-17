'use client';

import { useCallback, useEffect, useReducer } from 'react';

const STORAGE_KEY = 'evms-training-beads';

export type Bead = {
	id: number;
	name: string;
	difficulty: number;
	unlocked: boolean;
	completed: boolean;
	scenarioId: number;
};

const DEFAULT_BEADS: Bead[] = [
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

function loadFromStorage(): Bead[] {
	if (typeof window === 'undefined') return DEFAULT_BEADS;
	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) return DEFAULT_BEADS;
	try {
		const parsed = JSON.parse(raw) as unknown;
		if (Array.isArray(parsed)) return parsed as Bead[];
	} catch {
		return DEFAULT_BEADS;
	}
	return DEFAULT_BEADS;
}

function saveToStorage(beads: Bead[]) {
	if (typeof window === 'undefined') return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(beads));
}

function initBeads(defaultBeads: Bead[]): Bead[] {
	if (typeof window === 'undefined') return defaultBeads;
	return loadFromStorage();
}

type BeadsAction =
	| { type: 'complete'; scenarioId: number }
	| { type: 'reset' };

function beadsReducer(beads: Bead[], action: BeadsAction): Bead[] {
	switch (action.type) {
		case 'complete': {
			const next = beads.map((b) =>
				b.scenarioId === action.scenarioId ? { ...b, completed: true } : b
			);
			const firstLocked = next.find((b) => !b.completed && !b.unlocked);
			if (firstLocked) {
				return next.map((b) => (b.id === firstLocked.id ? { ...b, unlocked: true } : b));
			}
			return next;
		}
		case 'reset':
			return structuredClone(DEFAULT_BEADS);
		default:
			return beads;
	}
}

export function useBeadsStore() {
	const [beads, dispatch] = useReducer(beadsReducer, DEFAULT_BEADS, initBeads);

	useEffect(() => {
		saveToStorage(beads);
	}, [beads]);

	const completeBead = useCallback((scenarioId: number) => {
		dispatch({ type: 'complete', scenarioId });
	}, []);

	const resetProgress = useCallback(() => {
		dispatch({ type: 'reset' });
	}, []);

	const isUnlocked = useCallback(
		(scenarioId: number) => beads.find((b) => b.scenarioId === scenarioId)?.unlocked ?? false,
		[beads]
	);

	const isCompleted = useCallback(
		(scenarioId: number) => beads.find((b) => b.scenarioId === scenarioId)?.completed ?? false,
		[beads]
	);

	const completedCount = beads.filter((b) => b.completed).length;

	return {
		beads,
		completedCount,
		totalCount: beads.length,
		completeBead,
		resetProgress,
		isUnlocked,
		isCompleted
	};
}
