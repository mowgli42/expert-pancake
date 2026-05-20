import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

function resolvePublicSiteBase(mode) {
	const env = loadEnv(mode, process.cwd(), '');
	const explicit = env.VITE_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
	if (explicit) return explicit;
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`.replace(/\/$/, '');
	}
	return '';
}

function buildCourseJsonLd(siteBase) {
	const course = {
		'@context': 'https://schema.org',
		'@type': 'Course',
		name: 'EVMS Training — Earned Value Management (EVM & EVMS)',
		description:
			'Interactive EVMS and earned value training: EVMS 101 definitions, twelve read-the-metrics cases with manager narrative checks, and ten choose-your-path project scenarios (BAC through CPI/SPI).',
		educationalLevel: 'Beginner to intermediate',
		isAccessibleForFree: true,
		inLanguage: 'en',
		provider: {
			'@type': 'Organization',
			name: 'EVMS Training'
		},
		teaches: [
			'Earned value management',
			'EVMS',
			'Budget at completion (BAC)',
			'Planned value (PV)',
			'Earned value (EV)',
			'Actual cost (AC)',
			'SPI',
			'CPI',
			'Variance analysis'
		],
		hasCourseInstance: {
			'@type': 'CourseInstance',
			courseMode: 'online',
			courseWorkload: 'PT4H'
		}
	};
	if (siteBase) {
		course.url = `${siteBase}/`;
	}
	return JSON.stringify(course);
}

function injectPublicSiteMeta(mode) {
	return {
		name: 'inject-public-site-meta',
		transformIndexHtml(html) {
			const siteBase = resolvePublicSiteBase(mode);
			const canonicalHref = siteBase ? `${siteBase}/` : '/';
			const ogBlock = siteBase
				? `
    <meta property="og:url" content="${canonicalHref}" />
    <meta property="og:image" content="${siteBase}/vite.svg" />
    <meta property="og:image:alt" content="EVMS Training — interactive earned value and EVMS lessons" />`
				: '';
			const jsonLd = buildCourseJsonLd(siteBase);
			return html
				.replaceAll('__CANONICAL_HREF__', canonicalHref)
				.replace('__OG_SITE_BLOCK__', ogBlock)
				.replace('__JSON_LD__', jsonLd);
		}
	};
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
	plugins: [svelte(), injectPublicSiteMeta(mode)],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('scenarios/index')) return 'scenarios-data';
					if (id.includes('metricsLiteracyScenarios')) return 'metrics-data';
					if (id.includes('evms101Content')) return 'evms101-data';
					if (id.includes('node_modules')) return 'vendor';
				}
			}
		}
	}
}));
