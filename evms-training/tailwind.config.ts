import type { Config } from 'tailwindcss';

export default {
	content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				accent: { DEFAULT: '#0d9488', dark: '#115e59', muted: 'rgba(13, 148, 136, 0.15)' },
				success: { DEFAULT: '#059669', muted: 'rgba(5, 150, 105, 0.15)' },
				warning: '#d97706',
				danger: '#dc2626',
				surface: { 1: '#fafaf9', 2: '#f5f5f4', 3: '#e7e5e4' },
				ink: { 1: '#1c1917', 2: '#57534e', 3: '#a8a29e' },
				border: '#d6d3d1'
			},
			maxWidth: { content: '1200px' },
			boxShadow: { card: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)' }
		}
	},
	plugins: []
} satisfies Config;
