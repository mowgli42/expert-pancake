/**
 * Debounced localStorage helpers — reduces write churn on mobile/slow devices.
 */

const pendingWrites = new Map();

export function readJson(key, fallback) {
	if (typeof localStorage === 'undefined') return fallback;
	const raw = localStorage.getItem(key);
	if (!raw) return fallback;
	try {
		const parsed = JSON.parse(raw);
		return parsed ?? fallback;
	} catch {
		return fallback;
	}
}

export function writeJson(key, value) {
	if (typeof localStorage === 'undefined') return;
	try {
		if (value == null) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, JSON.stringify(value));
		}
	} catch {
		/* quota or private browsing — ignore */
	}
}

export function writeJsonDebounced(key, value, delayMs = 400) {
	if (typeof localStorage === 'undefined') return;
	const existing = pendingWrites.get(key);
	if (existing) clearTimeout(existing);
	const timer = setTimeout(function flush() {
		pendingWrites.delete(key);
		writeJson(key, value);
	}, delayMs);
	pendingWrites.set(key, timer);
}

export function flushPendingWrites() {
	for (const [key, timer] of pendingWrites.entries()) {
		clearTimeout(timer);
		pendingWrites.delete(key);
	}
}

export function isStorageAvailable() {
	if (typeof localStorage === 'undefined') return false;
	try {
		const probe = '__evms_storage_probe__';
		localStorage.setItem(probe, '1');
		localStorage.removeItem(probe);
		return true;
	} catch {
		return false;
	}
}
