import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';

const target = document.getElementById('app');
if (!target) {
	throw new Error('EVMS Training: missing #app mount target');
}

target.replaceChildren();

const app = mount(App, {
	target
});

export default app;
