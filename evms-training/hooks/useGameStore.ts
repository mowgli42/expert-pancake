'use client';

import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { calculateEvmsMetrics } from '@/lib/evms/calculations';

const STORAGE_KEY = 'evms-training-game';

export type GameState = {
	scenarioId: number | null;
	turnIndex: number;
	pv: number;
	ev: number;
	ac: number;
	bac: number;
	feedback: string | null;
	awaitingAdvance: boolean;
	choiceHistory: { text: string; turnIndex: number }[];
};

function loadFromStorage(): Partial<GameState> | null {
	if (typeof window === 'undefined') return null;
	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) return null;
	try {
		const parsed = JSON.parse(raw) as unknown;
		if (parsed && typeof parsed === 'object' && typeof (parsed as GameState).scenarioId === 'number') {
			return parsed as GameState;
		}
	} catch {
		return null;
	}
	return null;
}

function saveToStorage(state: GameState) {
	if (typeof window === 'undefined') return;
	if (state.scenarioId != null) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} else {
		localStorage.removeItem(STORAGE_KEY);
	}
}

const initial: GameState = {
	scenarioId: null,
	turnIndex: 0,
	pv: 0,
	ev: 0,
	ac: 0,
	bac: 0,
	feedback: null,
	awaitingAdvance: false,
	choiceHistory: []
};

function initFromStorage(): GameState {
	const s = loadFromStorage();
	if (!s || typeof s.scenarioId !== 'number') return initial;
	return { ...initial, ...s };
}

type Action =
	| { type: 'init'; scenario: { id: number; bac: number } }
	| { type: 'choice'; choice: { pvDelta?: number; evDelta?: number; acDelta?: number; feedback?: string | null; text: string } }
	| { type: 'advance' }
	| { type: 'reset' };

function reducer(state: GameState, action: Action): GameState {
	switch (action.type) {
		case 'init':
			return {
				...initial,
				scenarioId: action.scenario.id,
				bac: action.scenario.bac
			};
		case 'choice': {
			if (state.awaitingAdvance) return state;
			return {
				...state,
				pv: state.pv + (action.choice.pvDelta ?? 0),
				ev: state.ev + (action.choice.evDelta ?? 0),
				ac: state.ac + (action.choice.acDelta ?? 0),
				feedback: action.choice.feedback ?? null,
				choiceHistory: [...state.choiceHistory, { text: action.choice.text, turnIndex: state.turnIndex }],
				awaitingAdvance: true
			};
		}
		case 'advance': {
			if (!state.awaitingAdvance) return state;
			return {
				...state,
				feedback: null,
				awaitingAdvance: false,
				turnIndex: state.turnIndex + 1
			};
		}
		case 'reset':
			return initial;
		default:
			return state;
	}
}

export function useGameStore() {
	const [state, dispatch] = useReducer(reducer, initial, initFromStorage);

	useEffect(() => {
		saveToStorage(state);
	}, [state]);

	const initScenario = useCallback((scenario: { id: number; bac: number }) => {
		dispatch({ type: 'init', scenario });
	}, []);

	const selectChoice = useCallback(
		(choice: { pvDelta?: number; evDelta?: number; acDelta?: number; feedback?: string | null; text: string }) => {
			dispatch({ type: 'choice', choice });
		},
		[]
	);

	const advanceAfterFeedback = useCallback(() => {
		dispatch({ type: 'advance' });
	}, []);

	const resetGame = useCallback(() => {
		dispatch({ type: 'reset' });
	}, []);

	const metrics = useMemo(
		() => (state.bac > 0 ? calculateEvmsMetrics({ pv: state.pv, ev: state.ev, ac: state.ac, bac: state.bac }) : null),
		[state.pv, state.ev, state.ac, state.bac]
	);

	return {
		...state,
		metrics,
		initScenario,
		selectChoice,
		advanceAfterFeedback,
		resetGame
	};
}
