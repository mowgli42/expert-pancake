import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';
import { flushPendingWrites } from './lib/storage.js';

const target = document.getElementById('app');
if (!target) {
	throw new Error('EVMS Training: missing #app mount target');
}

target.replaceChildren();

window.addEventListener('pagehide', function onPageHide() {
	flushPendingWrites();
});

const app = mount(App, {
	target
});

export default app;
